from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db


cart_routes = Blueprint('cart', __name__)

#Get all products in cart
@cart_routes.route('/')
@login_required
def cartProducts():
  cart = Cart.query.filter(Cart.userId == current_user.id)
  print(cart.to_dict()) #for later testing
  return {"cart": cart.to_dict()}


