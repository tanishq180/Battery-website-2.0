from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.mail import send_admin_enquiry_alert, send_customer_enquiry_ack
from app.crud.crud_enquiry import create_enquiry
from app.crud.crud_product import get_product_by_id
from app.schemas.enquiry import EnquiryCreate, EnquiryResponse
from app.services.whatsapp import generate_whatsapp_quote_link

router = APIRouter()


@router.post("/enquiries", response_model=EnquiryResponse, status_code=status.HTTP_201_CREATED)
def submit_enquiry(
    enquiry_in: EnquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
) -> EnquiryResponse:
    """Submit customer quote request, trigger non-blocking background emails, and return pre-filled WhatsApp link."""
    product_title = "General Product Inquiry"
    if enquiry_in.product_id is not None:
        product = get_product_by_id(db=db, product_id=enquiry_in.product_id)
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Product with ID {enquiry_in.product_id} not found",
            )
        product_title = product.title

    db_enquiry = create_enquiry(db=db, enquiry_in=enquiry_in)

    # Generate pre-filled WhatsApp click-to-chat URL
    whatsapp_url = generate_whatsapp_quote_link(
        product_title=product_title, target_quantity=enquiry_in.target_quantity
    )

    # Schedule non-blocking background email notifications
    background_tasks.add_task(
        send_customer_enquiry_ack,
        customer_email=enquiry_in.customer_email,
        customer_name=enquiry_in.customer_name,
        product_title=product_title,
        quantity=enquiry_in.target_quantity,
    )

    background_tasks.add_task(
        send_admin_enquiry_alert,
        enquiry_data={
            "customer_name": enquiry_in.customer_name,
            "customer_email": enquiry_in.customer_email,
            "customer_phone": enquiry_in.customer_phone,
            "product_title": product_title,
            "target_quantity": enquiry_in.target_quantity,
            "message": enquiry_in.message,
        },
    )

    response = EnquiryResponse.model_validate(db_enquiry)
    response.whatsapp_url = whatsapp_url
    return response
