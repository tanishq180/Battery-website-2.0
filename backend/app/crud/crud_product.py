from typing import List, Optional, Tuple
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload, selectinload

from app.models.category import Category
from app.models.price_tier import PriceTier
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def get_products(
    db: Session,
    search: Optional[str] = None,
    category_slug: Optional[str] = None,
    skip: int = 0,
    limit: int = 10,
) -> Tuple[List[Product], int]:
    """Retrieve paginated products with optional search and category slug filtering."""
    query = db.query(Product)

    if category_slug:
        query = query.join(Category, Product.category_id == Category.id).filter(
            Category.slug == category_slug
        )

    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            or_(
                Product.title.ilike(search_filter),
                Product.description.ilike(search_filter),
            )
        )

    total = query.count()

    items = (
        query.options(
            joinedload(Product.category),
            selectinload(Product.price_tiers),
        )
        .order_by(Product.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    # Sort price tiers by min_quantity ascending for consistency
    for item in items:
        if item.price_tiers:
            item.price_tiers.sort(key=lambda pt: pt.min_quantity)

    return items, total


def get_product_by_id(db: Session, product_id: int) -> Optional[Product]:
    """Retrieve single product with eagerly loaded category and sorted price tiers."""
    product = (
        db.query(Product)
        .options(
            joinedload(Product.category),
            selectinload(Product.price_tiers),
        )
        .filter(Product.id == product_id)
        .first()
    )

    if product and product.price_tiers:
        product.price_tiers.sort(key=lambda pt: pt.min_quantity)

    return product


def create_product_with_tiers(db: Session, product_in: ProductCreate) -> Product:
    """Create product and associated price break tiers in a single atomic transaction."""
    db_product = Product(
        title=product_in.title,
        description=product_in.description,
        use_cases=product_in.use_cases,
        image_url=product_in.image_url,
        category_id=product_in.category_id,
    )
    db.add(db_product)
    db.flush()  # Flush to generate product ID for price tiers

    if product_in.price_tiers:
        for tier_in in product_in.price_tiers:
            db_tier = PriceTier(
                product_id=db_product.id,
                min_quantity=tier_in.min_quantity,
                max_quantity=tier_in.max_quantity,
                unit_price=tier_in.unit_price,
            )
            db.add(db_tier)

    db.commit()
    return get_product_by_id(db, db_product.id)


def update_product_with_tiers(
    db: Session, product_id: int, product_in: ProductUpdate
) -> Optional[Product]:
    """Update product attributes and replace/recalibrate associated price tiers."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return None

    update_data = product_in.model_dump(exclude_unset=True)

    if "price_tiers" in update_data:
        tiers_data = update_data.pop("price_tiers")
        # Delete existing price tiers
        db.query(PriceTier).filter(PriceTier.product_id == product_id).delete()
        if tiers_data:
            for tier_dict in tiers_data:
                db_tier = PriceTier(
                    product_id=product_id,
                    min_quantity=tier_dict["min_quantity"],
                    max_quantity=tier_dict.get("max_quantity"),
                    unit_price=tier_dict["unit_price"],
                )
                db.add(db_tier)

    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    return get_product_by_id(db, product_id)


def delete_product(db: Session, product_id: int) -> bool:
    """Delete product by ID (cascade handles dependent price tiers)."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        return False

    db.delete(product)
    db.commit()
    return True
