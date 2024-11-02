from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Wishlist, db, Product

wishlist_routes = Blueprint('wishlists', __name__)

#View wishlist
@wishlist_routes.route("/")
@login_required
def view_wishlist():
