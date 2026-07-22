from typing import Any, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_admin, get_db
from app.crud.crud_enquiry import (
    get_enquiries_by_status,
    update_enquiry_status_and_notes,
)
from app.schemas.enquiry import (
    EnquiryDetailResponse,
    EnquiryListResponse,
    EnquiryStatusUpdate,
)

router = APIRouter()


@router.get(
    "/admin/enquiries",
    response_model=EnquiryListResponse,
    dependencies=[Depends(get_current_admin)],
)
def read_admin_enquiries(
    status: Optional[str] = Query("Received", description="Filter by status ('Received' or 'Attended')"),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Page size limit"),
    db: Session = Depends(get_db),
) -> Any:
    """Retrieve paginated lead/enquiry dashboard records filtered by status (Admin only)."""
    skip = (page - 1) * size
    items, total = get_enquiries_by_status(
        db=db, status=status, skip=skip, limit=size
    )
    return EnquiryListResponse(items=items, total=total, page=page, size=size)


@router.patch(
    "/admin/enquiries/{enquiry_id}/status",
    response_model=EnquiryDetailResponse,
    dependencies=[Depends(get_current_admin)],
)
def update_enquiry_status(
    enquiry_id: int,
    status_update: EnquiryStatusUpdate,
    db: Session = Depends(get_db),
) -> Any:
    """Update enquiry status and append timestamped internal log notes (Admin only)."""
    enquiry = update_enquiry_status_and_notes(
        db=db, enquiry_id=enquiry_id, status_update=status_update
    )
    if not enquiry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Enquiry with ID {enquiry_id} not found",
        )
    return enquiry
