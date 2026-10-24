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

    from app.catalog_seed import seed_sunka_catalog
    seed_sunka_catalog(db)

    db.commit()
except Exception as e:
    logger.error(f"Startup seed error: {e}")
    db.rollback()
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Sunka battery catalog and enquiry API",
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
