from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Cart, db, Product, carts_products

cart_routes = Blueprint('cart', __name__)

#Get all products in cart
@cart_routes.route('/')
@login_required
def cart_products():
  cart= current_user.cart

  # idea for getting all products with their quantity.
  # cart_details = []

  # # Iterate over the products in the cart
  # for product in cart.products:
  #     cart_product = db.session.query(carts_products).filter_by(cartId=cart.id, productId=product.id).first()

  #     if cart_product:
  #         cart_details.append({
  #             'productId': product.id,
  #             'productName': product.name,
  #             'quantity': cart_product.quantity,
  #             'price': product.price,
  #         })

  # return {
  #     'cartDetails': cart_details,
  #     'subtotal': cart.subtotal
  # }, 200

  return {"cart": cart.to_dict()}



#Add product to cart
  #only does one product at a time because product does not
  #as an attribute
@cart_routes.route('/', methods=['POST'])
@login_required
def add_to_cart():
  data = request.get_json()
  product_id = data.get('productId')
  quantity = data.get('quantity', 1) #Default of one if value is not specified.

  cart = current_user.cart
  product = Product.query.get(product_id)

  if cart and product:
    #Check to see if product is in the cart already
    cart_product = db.session.query(carts_products).filter_by(
      cartId=cart.id,
      productId=product.id
    ).first()

    if cart_product:
      db.session.execute(
        carts_products.update().where(carts_products.c.cartId == cart.id, carts_products.c.productId == product.id).
        values(quantity=quantity + cart.get_quantity(product_id))
      )
    else:

      db.session.execute(
        carts_products.insert().values(cartId=cart.id, productId=product.id, quantity=quantity)
      )

    db.session.commit()
    cart.update_subtotal()

    return {'message': "Product has been added to cart", 'subtotal': str(round(cart.subtotal, 2))}, 200
  else:
    return {"message": "Product not found"}, 404

#Delete product from shopping cart
@cart_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def delete_from_cart(productId):
    cart_product = db.session.query(carts_products).filter_by(
      cartId=current_user.cart.id,
      productId=productId
    ).first()

    if cart_product:
      db.session.execute(
        carts_products.delete().where(
          carts_products.c.cartId == current_user.cart.id,
          carts_products.c.productId == productId
        )
      )
      db.session.commit()
      return {"message": "Product removed from Cart"}
    else:
      return {"message": "Can't find product in Cart"}

@cart_routes.route('/checkout', methods=["POST"])
@login_required
def transaction():
  cart = current_user.cart
  if cart.subtotal > 0:
    #Do transaction stuff
    total = float(cart.subtotal) * 1.0725
    #Class method that empties cart and commits the
    #change in model
    cart.empty_cart()
    return {"message": f"Your transaction of {round(total, 2)} was successful"}
  else:
    return {"message": "Your cart is empty"}
