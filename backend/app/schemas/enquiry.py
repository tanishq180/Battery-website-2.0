from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from app.schemas.product import ProductBase


class EnquiryCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    product_id: Optional[int] = None
    target_quantity: int = Field(..., gt=0, description="Target order quantity must be greater than 0")
    message: Optional[str] = None


class EnquiryResponse(EnquiryCreate):
    id: int
    status: str
    created_at: datetime
    whatsapp_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class EnquiryStatusUpdate(BaseModel):
    status: str = Field(..., description="Allowed status values: 'Received' or 'Attended'")
    internal_notes: Optional[str] = None

    @field_validator("status")
    @classmethod
    def validate_status(cls, v: str) -> str:
        allowed = {"Received", "Attended"}
        if v not in allowed:
            raise ValueError(f"Invalid status '{v}'. Allowed values are: {', '.join(allowed)}")
        return v


class EnquiryDetailResponse(EnquiryResponse):
    internal_notes: Optional[str] = None
    product: Optional[ProductBase] = None

    model_config = ConfigDict(from_attributes=True)


class EnquiryListResponse(BaseModel):
    items: List[EnquiryDetailResponse]
    total: int
    page: int
    size: int
