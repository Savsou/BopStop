from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

# Join table for carts and products
carts_products = db.Table(
    'carts_products',
    db.Column('cartId', db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), primary_key=True),
    db.Column('productId', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True),
    db.Column('createdAt', db.DateTime, default=datetime.now, nullable=False),
)

# Join table for wishlists and products
wishlists_products = db.Table(
    'wishlists_products',
    db.Column('productId', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True),
    db.Column('wishlistId', db.Integer, db.ForeignKey(add_prefix_for_prod('wishlists.id')), primary_key=True),
    db.Column('createdAt', db.DateTime, default=datetime.now, nullable=False),
)


if environment == "production":
    carts_products.schema = SCHEMA
    wishlists_products.schema = SCHEMA
