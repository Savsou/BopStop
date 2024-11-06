from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Wishlist, db, Product, wishlists_products

wishlist_routes = Blueprint('wishlists', __name__)

# #View wishlist
# @wishlist_routes.route("/")
# @login_required
# def view_wishlist():

@wishlist_routes.route('/')
@login_required
def view_wishlist():
  wishlist = current_user.to_dict()["wishlists"]
  result =[]

  for product in wishlist["products"]:
    dict_product = {
      "productId": product["productId"],
      "productName": product["name"],
      "userId": product["userId"],
      "price": product["price"]
    }
    result.append(dict_product)

  return {'wishlist': result}

@wishlist_routes.route('/', methods=["POST"])
@login_required
def add_to_wishlist():
  data = request.get_json()
  product_id = data.get('productId')
  product = Product.query.get(product_id)
  if product:
    wishlist_product = db.session.query(wishlists_products).filter_by(
      wishlistId=current_user.wishlist.id,
      productId=product_id
    ).first()

    if wishlist_product:
      return {"message": "Product is already in the wishlist"}, 400
    else:
      db.session.execute(
        wishlists_products.insert().values(wishlistId=current_user.wishlist.id, productId=product_id)
      )
      db.session.commit()

      wishlist = current_user.to_dict()["wishlists"]
      result =[]

      for product in wishlist["products"]:
        dict_product = {
          "productId": product["productId"],
          "productName": product["name"],
          "userId": product["userId"],
          "price": product["price"]
        }
        result.append(dict_product)

      return {
        "message": "Product added to the wishlist",
        'wishlist': result
      }
  else:
    return {"message": "Product not found"}, 404

@wishlist_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def delete_wishlist_product(productId):
  product = Product.query.get(productId)

  if product:
    wishlist_product = db.session.query(wishlists_products).filter_by(
      wishlistId=current_user.wishlist.id,
      productId=productId
    ).first()

    if wishlist_product:
      db.session.execute(
        wishlists_products.delete().where(
          wishlists_products.c.wishlistId == current_user.wishlist.id,
          wishlists_products.c.productId == productId
        )
      )

      db.session.commit()
      return {"message": "Product removed from the wishlist"}
    else:
      return {"message": "Product not found in wishlist"}, 404
  else:
    return {"message": "Product not found"}, 404
