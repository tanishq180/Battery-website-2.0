from typing import Optional
from urllib.parse import quote

from app.core.config import settings


def generate_whatsapp_quote_link(
    product_title: str, target_quantity: Optional[int] = None
) -> str:
    """Construct a pre-filled WhatsApp click-to-chat URL for quote inquiries."""
    if target_quantity and target_quantity > 0:
        message = f"Hi, I would like to inquire about {product_title}. My target order volume is {target_quantity} units."
    else:
        message = f"Hi, I would like to inquire about {product_title}."

    encoded_message = quote(message)
    phone_number = settings.WHATSAPP_BUSINESS_NUMBER.replace("+", "").replace("-", "").strip()
    return f"https://wa.me/{phone_number}?text={encoded_message}"
