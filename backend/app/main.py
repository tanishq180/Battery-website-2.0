from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.models.user import User
from app.models.category import Category
from app.models.product import Product
from app.models.price_tier import PriceTier
from app.models.enquiry import Enquiry
from app.core.security import get_password_hash

logger = logging.getLogger(__name__)

# Ensure tables exist
Base.metadata.create_all(bind=engine)

# Auto seed default admin and sample products if empty
db = SessionLocal()
try:
    admin_user = db.query(User).filter(User.email == "admin@company.com").first()
    if not admin_user:
        hashed_password = get_password_hash("AdminPassword123!")
        new_admin = User(
            email="admin@company.com",
            hashed_password=hashed_password,
            role="admin",
        )
        db.add(new_admin)

    # Seed sample category & products if empty
    cat_count = db.query(Category).count()
    if cat_count == 0:
        c1 = Category(name="Industrial Goods", slug="industrial-goods")
        c2 = Category(name="Energy & Solar", slug="energy-solar")
        c3 = Category(name="Agricultural Wholesale", slug="agricultural-wholesale")
        db.add_all([c1, c2, c3])
        db.commit()

        p1 = Product(
            title="Solar Inverter 10kW Commercial Grade",
            description="High-efficiency 10kW pure sine wave solar inverter designed for commercial energy storage and industrial grid tie installations.",
            use_cases=["Commercial Solar Plants", "Factory Backup Power", "Off-grid Facilities"],
            image_url="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
            category_id=c2.id,
        )
        p2 = Product(
            title="Heavy Duty Industrial LiFePO4 Battery 48V",
            description="Deep cycle 48V 200Ah Lithium Iron Phosphate battery module engineered for heavy manufacturing and backup power systems.",
            use_cases=["Telecom Towers", "Heavy Manufacturing", "Grid Energy Storage"],
            image_url="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
            category_id=c1.id,
        )
        db.add_all([p1, p2])
        db.commit()

        # Seed Price Tiers
        pt1 = PriceTier(product_id=p1.id, min_quantity=1, max_quantity=49, unit_price=500.0)
        pt2 = PriceTier(product_id=p1.id, min_quantity=50, max_quantity=199, unit_price=450.0)
        pt3 = PriceTier(product_id=p1.id, min_quantity=200, max_quantity=None, unit_price=400.0)

        pt4 = PriceTier(product_id=p2.id, min_quantity=1, max_quantity=24, unit_price=1200.0)
        pt5 = PriceTier(product_id=p2.id, min_quantity=25, max_quantity=99, unit_price=1050.0)
        pt6 = PriceTier(product_id=p2.id, min_quantity=100, max_quantity=None, unit_price=950.0)
        db.add_all([pt1, pt2, pt3, pt4, pt5, pt6])
        db.commit()

    db.commit()
except Exception as e:
    logger.error(f"Startup seed error: {e}")
    db.rollback()
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Import/Export Business Web Application Backend API",
)

# Enable CORS for browser access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include consolidated v1 API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME}",
        "version": settings.VERSION,
        "docs": "/docs",
    }


@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
    }
