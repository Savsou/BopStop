from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db, Product


cart_routes = Blueprint('cart', __name__)

#Get all products in cart
@cart_routes.route('/')
@login_required
def cart_products():
  cart = Cart.query.filter(Cart.userId == current_user.id)
  # cart= current_user.cart
  print(cart.to_dict()) #for later testing
  return {"cart": cart.to_dict()}


#Add product to cart
  #only does one product at a time because product does not
  #as an attribute
@cart_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
  data = request.get_json()
  product_id = data.get('productId')

  cart = current_user.cart
  product = Product.query.get(product_id)

  if cart and product:
    cart.products.append(product)
    db.session.commit()

    cart.update_subtotal()

    return {'message': "Product has been added to cart", 'subtotal': str(cart.subtotal)}, 200
  else:
    return {"message": "Product not found"}, 404

#Delete product from shopping cart
@cart_routes.route('/<int:productId>', methods:["DELETE"])
@login_required
def delete_from_cart(productId):
  products = current_user.cart.products
  for product in products:
    if product.id == productId:
      products.remove(product)
      db.session.commit()
      return {"message": "Product removed from Cart"}
    else:
      return {"message": "Can't find product in Cart"}

@cart_routes.route('/checkout', methods=["POST"])
@login_required
def transaction():
  cart = current_user.cart
  #Do transaction stuff
  total = cart.subtotal #+ tax
  #Class method that empties cart and commits the
  #change in model
  cart.empty_cart()
  return {"message": "Transaction successful"}
