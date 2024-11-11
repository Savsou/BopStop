from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    artistName = db.Column(db.String, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String)
    profileImageUrl = db.Column(db.String)
    bannerImageUrl = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    products = db.relationship('Product', backref='user', cascade='all, delete-orphan')
    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')
    wishlist = db.relationship('Wishlist', backref='user', uselist=False, cascade='all, delete-orphan')
    cart = db.relationship('Cart', backref='user', uselist=False, cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'artistName': self.artistName,
            'username': self.username,
            'email': self.email,
            'bio': self.bio if self.bio else "",
            'profileImageUrl': self.profileImageUrl if self.profileImageUrl else "",
            'bannerImageUrl': self.bannerImageUrl if self.bannerImageUrl else "",
            'createdAt': self.createdAt.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updatedAt.strftime('%Y-%m-%d %H:%M:%S'),
            'products': [product.to_dict() for product in self.products],
            'reviews': [review.to_dict() for review in self.reviews],
            'wishlists': self.wishlist.to_dict() if self.wishlist else None,
            'cart': self.cart.to_dict() if self.cart else None
        }
