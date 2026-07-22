import os
import logging
from typing import Any, Dict
from jinja2 import Environment, FileSystemLoader
import resend

from app.core.config import settings

logger = logging.getLogger("app.mail")
logging.basicConfig(level=logging.INFO)

# Setup Jinja2 templates directory
TEMPLATES_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "templates"))
jinja_env = Environment(loader=FileSystemLoader(TEMPLATES_DIR), autoescape=True)


def _send_email_via_resend(to_email: str, subject: str, html_content: str) -> None:
    """Send email via Resend API or log to console if API key is not configured."""
    if settings.EMAIL_API_KEY:
        resend.api_key = settings.EMAIL_API_KEY
        try:
            params = {
                "from": settings.SENDER_EMAIL,
                "to": [to_email],
                "subject": subject,
                "html": html_content,
            }
            email_res = resend.Emails.send(params)
            logger.info(f"[EMAIL DISPATCH] Sent to '{to_email}' - Resend ID: {email_res.get('id')}")
        except Exception as e:
            logger.error(f"[EMAIL ERROR] Failed to send email to '{to_email}': {e}")
    else:
        logger.info(f"[EMAIL SIMULATION] (No EMAIL_API_KEY set) To: {to_email} | Subject: '{subject}'")


def send_customer_enquiry_ack(
    customer_email: str, customer_name: str, product_title: str, quantity: int
) -> None:
    """Dispatch acknowledgment email to customer upon quote inquiry submission."""
    template = jinja_env.get_template("customer_ack.html")
    html_content = template.render(
        customer_name=customer_name,
        product_title=product_title,
        quantity=quantity,
    )
    subject = f"We received your quote request for {product_title}"
    _send_email_via_resend(to_email=customer_email, subject=subject, html_content=html_content)


def send_admin_enquiry_alert(enquiry_data: Dict[str, Any]) -> None:
    """Dispatch internal notification email to sales staff upon new customer lead."""
    template = jinja_env.get_template("admin_notify.html")
    html_content = template.render(
        customer_name=enquiry_data.get("customer_name"),
        customer_email=enquiry_data.get("customer_email"),
        customer_phone=enquiry_data.get("customer_phone"),
        product_title=enquiry_data.get("product_title", "General Inquiry"),
        target_quantity=enquiry_data.get("target_quantity"),
        message=enquiry_data.get("message"),
    )
    subject = f"🚨 New Lead: {enquiry_data.get('customer_name')} requested {enquiry_data.get('target_quantity')} units"
    _send_email_via_resend(
        to_email=settings.ADMIN_NOTIFICATION_EMAIL,
        subject=subject,
        html_content=html_content,
    )
