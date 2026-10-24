"""Import the supplied MERI Industries catalogue without resetting existing data."""
import json
from pathlib import Path
from sqlalchemy.orm import Session
from app.models.category import Category
from app.models.product import Product


def seed_sunka_catalog(db: Session) -> None:
    records = json.loads(Path(__file__).with_name("battery_catalog.json").read_text(encoding="utf-8"))
    # Presence of these catalog categories marks a completed import. Staff edits
    # and deletions are respected on subsequent starts.
    slugs = {item["category"]["slug"] for item in records}
    existing = db.query(Category).filter(Category.slug.in_(slugs)).all()
    if len(existing) == len(slugs):
        return
    categories = {category.slug: category for category in existing}
    for item in records:
        slug = item["category"]["slug"]
        if slug not in categories:
            category = Category(name=item["category"]["name"], slug=slug)
            db.add(category)
            db.flush()
            categories[slug] = category
        if db.query(Product).filter(Product.title == item["title"]).first():
            continue
        db.add(Product(title=item["title"], description=item["description"],
                       use_cases=item["use_cases"], image_url=item["image_url"],
                       category_id=categories[slug].id))
    db.flush()
