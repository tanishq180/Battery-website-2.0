from fastapi import APIRouter

from app.api.v1 import (
    admin_enquiries,
    admin_products,
    auth,
    categories,
    enquiries,
    products,
)

api_router = APIRouter()

api_router.include_router(auth.router, tags=["Authentication"])
api_router.include_router(categories.router, tags=["Categories"])
api_router.include_router(products.router, tags=["Products"])
api_router.include_router(enquiries.router, tags=["Enquiries"])
api_router.include_router(admin_products.router, tags=["Admin Products"])
api_router.include_router(admin_enquiries.router, tags=["Admin Enquiries"])
