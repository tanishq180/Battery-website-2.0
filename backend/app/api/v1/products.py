from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud.crud_product import get_product_by_id, get_products
from app.schemas.product import ProductDetailResponse, ProductListResponse

router = APIRouter()


@router.get("/products", response_model=ProductListResponse)
def read_products(
    search: Optional[str] = Query(None, description="Keyword search in title or description"),
    category_slug: Optional[str] = Query(None, description="Filter products by category slug"),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Page size limit"),
    db: Session = Depends(get_db),
) -> ProductListResponse:
    """Retrieve paginated product catalog with optional search and category filters."""
    skip = (page - 1) * size
    items, total = get_products(
        db=db,
        search=search,
        category_slug=category_slug,
        skip=skip,
        limit=size,
    )
    return ProductListResponse(items=items, total=total, page=page, size=size)


@router.get("/products/{product_id}", response_model=ProductDetailResponse)
def read_product(
    product_id: int,
    db: Session = Depends(get_db),
) -> ProductDetailResponse:
    """Retrieve single product details including category and quantity price break tiers."""
    product = get_product_by_id(db=db, product_id=product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    return product
