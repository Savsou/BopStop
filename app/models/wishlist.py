from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .association import wishlists_products

class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    products = db.relationship('Product', secondary=wishlists_products, backref="wishlists_list")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updatedAt.strftime('%Y-%m-%d %H:%M:%S'),
            'products': [product.to_dict() for product in self.products]
        }
