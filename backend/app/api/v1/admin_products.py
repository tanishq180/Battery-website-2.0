from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db
from app.crud.crud_product import (
    create_product_with_tiers,
    delete_product,
    update_product_with_tiers,
)
from app.models.user import User
from app.schemas.product import ProductCreate, ProductDetailResponse, ProductUpdate

router = APIRouter()


@router.post(
    "/admin/products",
    response_model=ProductDetailResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(get_current_admin)],
)
def create_new_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db),
) -> Any:
    """Create a new product with dynamic quantity price break tiers (Admin only)."""
    return create_product_with_tiers(db=db, product_in=product_in)


@router.put(
    "/admin/products/{product_id}",
    response_model=ProductDetailResponse,
    dependencies=[Depends(get_current_admin)],
)
def update_existing_product(
    product_id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db),
) -> Any:
    """Update existing product attributes and price tiers (Admin only)."""
    product = update_product_with_tiers(
        db=db, product_id=product_id, product_in=product_in
    )
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {product_id} not found",
        )
    return product


@router.delete(
    "/admin/products/{product_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_current_admin)],
)
def delete_existing_product(
    product_id: int,
    db: Session = Depends(get_db),
) -> Any:
    """Delete product by ID and cascade remove price tiers (Admin only)."""
    success = delete_product(db=db, product_id=product_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {product_id} not found",
        )
    return {"message": f"Product with ID {product_id} deleted successfully"}
