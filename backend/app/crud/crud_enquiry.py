from datetime import datetime, timezone
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session, joinedload

from app.models.enquiry import Enquiry
from app.schemas.enquiry import EnquiryCreate, EnquiryStatusUpdate


def create_enquiry(db: Session, enquiry_in: EnquiryCreate) -> Enquiry:
    """Create and persist a new customer inquiry record."""
    db_enquiry = Enquiry(
        customer_name=enquiry_in.customer_name,
        customer_email=enquiry_in.customer_email,
        customer_phone=enquiry_in.customer_phone,
        product_id=enquiry_in.product_id,
        target_quantity=enquiry_in.target_quantity,
        message=enquiry_in.message,
        status="Received",
    )
    db.add(db_enquiry)
    db.commit()
    db.refresh(db_enquiry)
    return db_enquiry


def get_enquiries_by_status(
    db: Session,
    status: Optional[str] = "Received",
    skip: int = 0,
    limit: int = 10,
) -> Tuple[List[Enquiry], int]:
    """Retrieve paginated inquiries filtered by status, sorted by created_at descending."""
    query = db.query(Enquiry)

    if status:
        query = query.filter(Enquiry.status == status)

    total = query.count()

    items = (
        query.options(joinedload(Enquiry.product))
        .order_by(Enquiry.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return items, total


def update_enquiry_status_and_notes(
    db: Session, enquiry_id: int, status_update: EnquiryStatusUpdate
) -> Optional[Enquiry]:
    """Update enquiry status and append formatted, timestamped internal notes."""
    enquiry = (
        db.query(Enquiry)
        .options(joinedload(Enquiry.product))
        .filter(Enquiry.id == enquiry_id)
        .first()
    )
    if not enquiry:
        return None

    enquiry.status = status_update.status

    if status_update.internal_notes and status_update.internal_notes.strip():
        date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        new_note_entry = f"[{date_str}] Status set to {status_update.status}. Note: {status_update.internal_notes.strip()}"
        
        if enquiry.internal_notes:
            enquiry.internal_notes += f"\n{new_note_entry}"
        else:
            enquiry.internal_notes = new_note_entry

    db.commit()
    db.refresh(enquiry)
    return enquiry
