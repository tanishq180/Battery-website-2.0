from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud.crud_category import get_all_categories
from app.schemas.category import CategoryResponse

router = APIRouter()


@router.get("/categories", response_model=List[CategoryResponse])
def read_categories(db: Session = Depends(get_db)) -> List[CategoryResponse]:
    """Retrieve list of all product categories."""
    return get_all_categories(db)
