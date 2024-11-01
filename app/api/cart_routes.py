from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db, Product


cart_routes = Blueprint('cart', __name__)

#Get all products in cart
@cart_routes.route('/')
@login_required
def cartProducts():
  cart = Cart.query.filter(Cart.userId == current_user.id)
  print(cart.to_dict()) #for later testing
  return {"cart": cart.to_dict()}

#Add product to cart
@cart_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
  data = request.get_json()
  product_id = data.get('productId')

  cart = Cart.query.filter(Cart.userId == current_user.id).first()
  product = Product.query.get(product_id)

  if cart and product:
    cart.products.append(product)
    db.session.commit()

    cart.update_subtotal()

    return {'message': "Product has been added to cart", 'subtotal': str(cart.subtotal)}, 200
  else:
    return {"message": "Cart or Product not found"}, 404
