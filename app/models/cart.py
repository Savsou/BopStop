from .association import carts_products
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    subtotal = db.Column(db.Numeric)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    products = db.relationship('Product', secondary=carts_products, backref='carts_list')

    def get_quantity(self, product_id):
        result = db.session.query(carts_products.c.quantity).filter(
            carts_products.c.cart_id == self.id,
            carts_products.c.product_id == product_id
        ).first()
        if result:
            return result.quantity
        return 0

    def update_subtotal(self):
        subtotal = sum(product.price for product in self.products)
        self.subtotal = subtotal
        db.session.commit()

    def empty_cart(self):
        self.products.clear()
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'subtotal': str(self.subtotal),
            'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updatedAt.strftime('%Y-%m-%d %H:%M:%S'),
            'products': [product.to_dict() for product in self.products]
        }
