from app.models import db, environment, SCHEMA, Cart, carts_products
from sqlalchemy.sql import text

def seed_carts():
    carts_data = [
        {'userId': 1, 'subtotal': 0.00},
        {'userId': 2, 'subtotal': 0.00},
        {'userId': 3, 'subtotal': 0.00},
        {'userId': 4, 'subtotal': 0.00},
        {'userId': 5, 'subtotal': 0.00},
    ]

    db.session.bulk_insert_mappings(Cart, carts_data)
    db.session.commit()

    # Insert cart-product associations directly
    cart_product_data = [
        {'cartId': 1, 'productId': 1},
        {'cartId': 1, 'productId': 2},
        {'cartId': 2, 'productId': 3},
        {'cartId': 2, 'productId': 4},
        {'cartId': 3, 'productId': 5},
        {'cartId': 4, 'productId': 6},
        {'cartId': 4, 'productId': 7},
        {'cartId': 5, 'productId': 8},
    ]

    # Insert each association individually
    for association in cart_product_data:
        db.session.execute(
            carts_products.insert().values(**association)
        )

    carts = Cart.query.all()
    for cart in carts:
        cart.update_subtotal()

    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.carts RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.carts_products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
        db.session.execute(text("DELETE FROM carts_products"))

    db.session.commit()
