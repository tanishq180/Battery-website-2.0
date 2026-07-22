from typing import List
from sqlalchemy.orm import Session
from app.models.category import Category


def get_all_categories(db: Session) -> List[Category]:
    """Retrieve all product categories ordered by name ascending."""
    return db.query(Category).order_by(Category.name.asc()).all()
