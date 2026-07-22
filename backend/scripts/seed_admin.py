import os
import sys

# Ensure backend root directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.database import SessionLocal
from app.core.security import get_password_hash
from app.models.user import User


def seed_admin() -> None:
    """Seed initial default administrator user into PostgreSQL database."""
    db = SessionLocal()
    try:
        admin_email = os.getenv("ADMIN_INITIAL_EMAIL", "admin@company.com")
        admin_password = os.getenv("ADMIN_INITIAL_PASSWORD", "AdminPassword123!")

        existing_admin = db.query(User).filter(User.email == admin_email).first()
        if existing_admin:
            print(f"[+] Admin user with email '{admin_email}' already exists. Skipping seeding.")
            return

        hashed_password = get_password_hash(admin_password)
        new_admin = User(
            email=admin_email,
            hashed_password=hashed_password,
            role="admin",
        )
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)
        print(f"[SUCCESS] Default admin user successfully created!")
        print(f"  - Email: {new_admin.email}")
        print(f"  - Role: {new_admin.role}")
        print(f"  - ID: {new_admin.id}")
    except Exception as e:
        db.rollback()
        print(f"[ERROR] Failed to seed admin user: {e}")
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()
