from app.models import db, environment, SCHEMA, Wishlist, wishlists_products
from sqlalchemy.sql import text

def seed_wishlists():
    wishlists_data = [
        {'userId': 1},
        {'userId': 2},
        {'userId': 3},
        {'userId': 4},
        {'userId': 5},
    ]

    db.session.bulk_insert_mappings(Wishlist, wishlists_data)
    db.session.commit()

    # Create associations between wishlists and products
    wishlist_product_data = [
        {'wishlistId': 1, 'productId': 1},
        {'wishlistId': 1, 'productId': 2},
        {'wishlistId': 2, 'productId': 3},
        {'wishlistId': 2, 'productId': 4},
        {'wishlistId': 3, 'productId': 5},
        {'wishlistId': 4, 'productId': 6},
        {'wishlistId': 4, 'productId': 7},
        {'wishlistId': 5, 'productId': 8},
    ]

    # Insert each association individually
    for association in wishlist_product_data:
        db.session.execute(
            wishlists_products.insert().values(**association)
        )
    db.session.commit()

def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.wishlists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.wishlists_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlists"))
        db.session.execute(text("DELETE FROM wishlists_products"))

    db.session.commit()
