from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, Review, db
from app.forms import EditProductForm
from app.forms import NewProductForm


product_routes = Blueprint('products', __name__)

#Get all products
@product_routes.route('/')
def products():
  products = Product.query.all()
  return {"products": [product.to_dict() for product in products]}
#Get details of a Product by id
@product_routes.route('/<int:productId>')
def product(productId):
  product = Product.query.get(productId)
  if(product):
    return product.to_dict()
  else:
    return {"message": "Product not found!"}, 404

#Get current user products (NOT yet in API docs)
@product_routes.route('/current')
@login_required
def user_products():
  user = current_user.to_dict()
  return user["products"]


# Delete an existing product.
@product_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def delete_product(productId):
  product = Product.query.get(productId)
  if(product):
    db.session.delete(product)
    db.session.commit()
    return {"message": "Product successfully deleted"}
  else:
    return {"message": "Product not found!"}, 404

# Create a Product
@product_routes.route('/', methods=["POST"])
@login_required
def create_product():
  """
  Creates a new Product
  """
  # Below is for when we have a front end form we are getting data from
  # form = newProductForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  # if form.validate_on_submit():
  #   newProduct = Product(
  #     userId=form.data['userId'],
  #     name=form.data['name'],
  #     type=form.data['type'],
  #     genre=form.data['genre'],
  #     price=form.data['price'],
  #     description=form.data['description'],
  #     imageUrl=form.data['imageUrl']
  #   )

  # this is for testing only, switch back to code above once frontend form exists
  data = request.get_json()
  newProduct = Product(
    userId=current_user.id,
    name=data['name'],
    type=data['type'],
    genre=data['genre'],
    price=data['price'],
    description=data['description'],
    imageUrl=data['imageUrl'])
  db.session.add(newProduct)
  db.session.commit()
  #redirect to GET product by id

  return newProduct.to_dict(), 201
  # return form.errors, 400

# Update and Return existing Product
@product_routes.route('/<int:productId>', methods=["PUT"])
@login_required
def update_product(productId):
  """
  Update a User's Product
  """
  # Below is for when we have a front end form we are getting data from
  # form = editProductForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  product = Product.query.get(productId)
  data = request.get_json()
  if(product):
    if(product.get_userId != current_user.id):
      return {'message': 'Requires proper authorization!'}, 403
    if "name" in data:
      product.name = data["name"]
    if "type" in data:
      product.type = data["type"]
    if "genre" in data:
      product.genre = data["genre"]
    if "price" in data:
      product.price = data["price"]
    if "description" in data:
      product.description = data["description"]
    if "imageUrl" in data:
      product.imageUrl = data["imageUrl"]
    try:
      db.session.commit()
      return {'product': product.to_dict()}
    except Exception as e:
      db.session.rollback()
      return {'message': 'Error updating Product', 'error': str(e)}, 400
  else:
    return {'message': 'Product could not be found!'}, 404


  if form.validate_on_submit():

    # newProduct = Product(
    #   name=form.data['name'],
    #   type=form.data['type'],
    #   genre=form.data['genre'],
    #   price=form.data['price'],
    #   description=form.data['description'],
    #   imageUrl=form.data['imageUrl']
    # )
    db.session.add(newProduct)
    db.session.commit()
    #redirect to GET product by id
    return newProduct.to_dict(), 201
  return form.errors, 400

# REVIEWS Get all reviews by product's id
@product_routes.route('/<int:productId>/reviews')
def product_reviews(productId):
  product = Product.query.get(productId)
  if product:
    return {"reviews": product.get_reviews}
  else:
    return {'message': 'Product could not be found!'}, 404

# REVIEWS Create and return a review for a product by id
  """
  add validations:
    user cant review their own products
    user can only leave ONE review per product
  """
@product_routes.route('/<int:productId>/reviews', methods=["POST"])
@login_required
def create_review(productId):
  product = Product.query.get(productId)
  if product is None:
    return {'message': 'Product could not be found!'}, 404
  data = request.get_json()
  newReview = Review(
    userId=current_user.id,
    review=data['review'],
    productId=productId,
  )
  db.session.add(newReview)
  db.session.commit()
  return {"review": newReview.to_dict()}
