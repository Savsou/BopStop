from .association import carts_products
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from decimal import Decimal

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
            carts_products.c.cartId == self.id,
            carts_products.c.productId == product_id
        ).first()
        if result:
            return result.quantity
        return 0

    def update_subtotal(self):
        subtotal = Decimal(0.00)
        for product in self.products:
            # Retrieve quantity from the carts_products join table
            cart_product = db.session.query(carts_products).filter_by(cartId=self.id, productId=product.id).first()
            quantity = cart_product.quantity if cart_product else 1  # Default to 1 if not found
            subtotal += product.price * quantity

        self.subtotal = Decimal(round(subtotal, 2))
        db.session.commit()

    def empty_cart(self):
        self.products.clear()
        db.session.commit()
        self.update_subtotal()

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'subtotal': str(self.subtotal),
            # 'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            # 'updatedAt': self.updatedAt.strftime('%Y-%m-%d %H:%M:%S'),
            'products': [product.to_dict() for product in self.products]
        }
