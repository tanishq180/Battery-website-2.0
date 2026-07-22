from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from app.schemas.category import CategoryResponse


class PriceTierBase(BaseModel):
    min_quantity: int
    max_quantity: Optional[int] = None
    unit_price: float

    model_config = ConfigDict(from_attributes=True)


class PriceTierCreate(PriceTierBase):
    pass


class PriceTierResponse(PriceTierBase):
    id: int


class ProductBase(BaseModel):
    title: str
    description: str
    use_cases: Optional[List[str]] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class ProductCreate(ProductBase):
    price_tiers: List[PriceTierCreate] = []


class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    use_cases: Optional[List[str]] = None
    image_url: Optional[str] = None
    category_id: Optional[int] = None
    price_tiers: Optional[List[PriceTierCreate]] = None


class ProductDetailResponse(ProductBase):
    id: int
    created_at: datetime
    category: Optional[CategoryResponse] = None
    price_tiers: List[PriceTierResponse] = []


class ProductListResponse(BaseModel):
    items: List[ProductDetailResponse]
    total: int
    page: int
    size: int
