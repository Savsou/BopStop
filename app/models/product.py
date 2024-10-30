from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .association import wishlists_products, carts_products

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    type = db.Column(db.String, nullable=False)
    genre = db.Column(db.String)
    price = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.String, nullable=False)
    imageUrl = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    reviews = db.relationship('Review', backref='product', cascade='all, delete-orphan')
    # wishlists = db.relationship('Wishlist', secondary=wishlists_products, backref='products')
    # carts = db.relationship('Cart', secondary=carts_products, backref='products')

    @property
    def get_userId(self):
        return self.userId

    def to_dict(self):
        return {
            'productId': self.id,
            'name': self.name,
            'userId': self.userId,
            'type': self.type,
            'genre': self.genre if self.genre else "",
            'price': str(round(self.price,2)),  # Convert Decimal to string for JSON
            'description': self.description,
            'imageUrl': self.imageUrl,
            # 'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            # 'updatedAt': self.updatedAt.strftime('%Y-%m-%d %H:%M:%S'),
            # 'reviews': [review.to_dict() for review in self.reviews],
            # 'wishlists': [wishlist.id for wishlist in self.wishlists],
            # 'carts': [cart.id for cart in self.carts],
        }
