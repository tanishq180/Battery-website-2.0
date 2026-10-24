"""HTTP checks against an isolated database; no email or WhatsApp messages are sent.
Run from backend: python -m unittest discover -s tests -v
"""
import json
import os
from pathlib import Path
import socket
import threading
import sys
import tempfile
import time
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen


class SiteFlows(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        with socket.socket() as listener:
            listener.bind(("127.0.0.1", 0))
            port = listener.getsockname()[1]
        cls.base = f"http://127.0.0.1:{port}"
        env = {**os.environ, "DATABASE_URL": "sqlite:///" + str(Path(cls.temp.name) / "test.db").replace("\\", "/"), "EMAIL_API_KEY": "", "WHATSAPP_BUSINESS_NUMBER": ""}
        sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
        cls.previous_env = {name: os.environ.get(name) for name in ["DATABASE_URL", "EMAIL_API_KEY", "WHATSAPP_BUSINESS_NUMBER"]}
        os.environ.update({name: env[name] for name in cls.previous_env})
        from app.main import app
        import uvicorn
        cls.server = uvicorn.Server(uvicorn.Config(app, host="127.0.0.1", port=port, log_level="error"))
        cls.thread = threading.Thread(target=cls.server.run, daemon=True)
        cls.thread.start()
        for _ in range(100):
            try:
                cls.request("/api/v1/health")
                break
            except Exception:
                if not cls.thread.is_alive():
                    raise RuntimeError("Isolated backend exited during startup")
                time.sleep(.2)
        else:
            cls.server.should_exit = True
            raise RuntimeError("Isolated backend did not start")
        cls.token = cls.request("/api/v1/admin/login", "POST", {"email": "admin@company.com", "password": "AdminPassword123!"})[1]["access_token"]

    @classmethod
    def tearDownClass(cls):
        cls.server.should_exit = True
        cls.thread.join(timeout=10)
        from app.core.database import engine
        engine.dispose()
        cls.temp.cleanup()
        for name, value in cls.previous_env.items():
            if value is None: os.environ.pop(name, None)
            else: os.environ[name] = value

    @classmethod
    def request(cls, path, method="GET", data=None, auth=False):
        headers = {"Content-Type": "application/json"}
        if auth:
            headers["Authorization"] = f"Bearer {cls.token}"
        request = Request(cls.base + path, data=json.dumps(data).encode() if data is not None else None, headers=headers, method=method)
        try:
            with urlopen(request, timeout=10) as response:
                raw = response.read()
                return response.status, json.loads(raw) if raw else None
        except HTTPError as error:
            with error:
                return error.code, json.loads(error.read())

    def test_original_catalog_and_all_details(self):
        status, catalog = self.request("/api/v1/products?size=100")
        self.assertEqual(status, 200)
        self.assertEqual(catalog["total"], 16)
        self.assertTrue(any("SUNKA MR1232BS" in p["title"] for p in catalog["items"]))
        for product in catalog["items"]:
            status, detail = self.request(f"/api/v1/products/{product['id']}")
            self.assertEqual(status, 200)
            self.assertEqual(detail["id"], product["id"])
            self.assertTrue(detail["image_url"].startswith("/images/"))

    def test_live_filters_and_search(self):
        _, categories = self.request("/api/v1/categories")
        self.assertEqual(len(categories), 3)
        for category in categories:
            _, result = self.request(f"/api/v1/products?category_slug={category['slug']}")
            self.assertGreater(result["total"], 0)
            self.assertTrue(all(p["category"]["slug"] == category["slug"] for p in result["items"]))
        _, result = self.request("/api/v1/products?search=MR1232BS")
        self.assertEqual(result["total"], 1)
        _, result = self.request("/api/v1/products?search=Emergency")
        self.assertGreater(result["total"], 0)
        _, result = self.request("/api/v1/products?search=no-such-battery-model")
        self.assertEqual(result["total"], 0)

    def test_contact_and_product_enquiries_reach_staff(self):
        _, catalog = self.request("/api/v1/products")
        product_id = catalog["items"][0]["id"]
        ids = []
        for selected in [None, product_id]:
            data = {"customer_name": "Isolated QA", "customer_email": "qa@example.com", "customer_phone": "+919876543210", "target_quantity": 3, "product_id": selected, "message": "Isolated site flow test"}
            status, saved = self.request("/api/v1/enquiries", "POST", data)
            self.assertEqual(status, 201)
            self.assertEqual(saved["product_id"], selected)
            self.assertIsNone(saved["whatsapp_url"])
            ids.append(saved["id"])
        _, leads = self.request("/api/v1/admin/enquiries?status=&size=100", auth=True)
        self.assertTrue(set(ids).issubset({x["id"] for x in leads["items"]}))
        status, lead = self.request(f"/api/v1/admin/enquiries/{ids[0]}/status", "PATCH", {"status": "Attended", "internal_notes": "Verified in test"}, auth=True)
        self.assertEqual(status, 200)
        self.assertEqual(lead["status"], "Attended")

    def test_staff_product_editor(self):
        _, categories = self.request("/api/v1/categories")
        data = {"title": "Isolated QA model", "description": "Temporary integration fixture", "category_id": categories[0]["id"], "price_tiers": []}
        status, product = self.request("/api/v1/admin/products", "POST", data, auth=True)
        self.assertEqual(status, 201)
        data["title"] = "Updated isolated QA model"
        status, updated = self.request(f"/api/v1/admin/products/{product['id']}", "PUT", data, auth=True)
        self.assertEqual(status, 200)
        self.assertEqual(updated["title"], data["title"])
        status, _ = self.request(f"/api/v1/admin/products/{product['id']}", "DELETE", auth=True)
        self.assertIn(status, [200, 204])
        self.assertEqual(self.request(f"/api/v1/products/{product['id']}")[0], 404)

    def test_invalid_enquiries_and_protected_routes(self):
        data = {"customer_name": "QA", "customer_email": "qa@example.com", "customer_phone": "123", "target_quantity": 0}
        self.assertEqual(self.request("/api/v1/enquiries", "POST", data)[0], 422)
        data["target_quantity"] = 1
        data["product_id"] = 999999
        self.assertEqual(self.request("/api/v1/enquiries", "POST", data)[0], 404)
        self.assertEqual(self.request("/api/v1/admin/enquiries")[0], 401)

    def test_catalog_import_is_idempotent(self):
        # Import the seed twice in another isolated database without HTTP side effects.
        from app.core.database import Base
        from app.catalog_seed import seed_sunka_catalog
        from sqlalchemy import create_engine
        from sqlalchemy.orm import Session
        from app.models.product import Product
        engine = create_engine("sqlite:///:memory:")
        Base.metadata.create_all(engine)
        with Session(engine) as db:
            seed_sunka_catalog(db)
            db.commit()
            first = db.query(Product).first()
            first.title = "Staff edited model"
            db.commit()
            seed_sunka_catalog(db)
            db.commit()
            self.assertEqual(db.query(Product).count(), 16)
            self.assertEqual(db.get(Product, first.id).title, "Staff edited model")
        engine.dispose()


if __name__ == "__main__":
    unittest.main()
