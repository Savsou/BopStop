from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Product, Review, db, User
from app.forms import EditProductForm
from app.forms import NewProductForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3


product_routes = Blueprint('products', __name__)

#Get all products
@product_routes.route('/')
def products():
  products = Product.query.all()
  allProducts = [product.to_dict() for product in products]
  for index, product in enumerate(allProducts):
    allProducts[index]["artistName"] = User.query.get(product['userId']).to_dict()['artistName']
  return {"products": allProducts}

#Get limited amount of products
@product_routes.route('/limited')
def limited_products():
  products = Product.query.limit(20).all()
  limitedProducts = [product.to_dict() for product in products]
  for index, product in enumerate(limitedProducts):
    limitedProducts[index]["artistName"] = User.query.get(product['userId']).to_dict()['artistName']
  return {"products": limitedProducts}

#Get details of a Product by id
@product_routes.route('/<int:productId>')
def product(productId):
  product = Product.query.get(productId)
  if(product is None):
    return {"message": "Product not found!"}, 404
  else:
    return product.to_dict()

#Get current user products (NOT yet in API docs)
@product_routes.route('/current')
@login_required
def current_products():
  user = current_user.to_dict()
  return {"products": user["products"]}

#Get products by userId (NOT yet in API docs)
@product_routes.route('/users/<int:userId>')
@login_required
def user_products(userId):
  user = User.query.get(userId).to_dict()
  return {"products": user["products"]}



# Delete an existing product.
@product_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def delete_product(productId):
  product = Product.query.get(productId)
  if(product):

    # Retrieve the product's image URL
    image_url = product.imageUrl
    # Delete the image from S3 if it exists
    if image_url:
      remove_file_from_s3(image_url)

    product.delete()
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
  form = NewProductForm()

  form["csrf_token"].data = request.cookies.get("csrf_token")

  if form.validate_on_submit():

    image = form.imageUrl.data
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)

    if "url" not in upload:
      return {"error": upload["errors"]}, 400

    url = upload["url"]

    newProduct = Product(
      userId=current_user.id,
      name=form.name.data,
      type=form.type.data,
      genre=form.genre.data,
      price=form.price.data,
      description=form.description.data,
      imageUrl=url
    )

    db.session.add(newProduct)
    db.session.commit()
    return newProduct.to_dict(), 201

  if form.errors:
    return form.errors, 400

  # this is for testing only, switch back to code above once frontend form exists
  # data = request.get_json()
  # newProduct = Product(
  #   userId=current_user.id,
  #   name=data['name'],
  #   type=data['type'],
  #   genre=data['genre'],
  #   price=data['price'],
  #   description=data['description'],
  #   imageUrl=data['imageUrl'])
  # db.session.add(newProduct)
  # db.session.commit()
  # return newProduct.to_dict(), 201

# Update and Return existing Product
@product_routes.route('edit/<int:productId>', methods=["PUT"])
@login_required
def update_product(productId):
  """
  Update a User's Product
  """
  # Below is for when we have a front end form we are getting data from
  product = Product.query.get(productId)

  if product is None:
    return {'message': 'Product could not be found!'}, 404

  if(product.get_userId != current_user.id):
    return {'message': 'Requires proper authorization!'}, 403

  form = EditProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    product.name = form.name.data
    product.type=form.type.data
    product.genre=form.genre.data
    product.price=form.price.data
    product.description=form.description.data

    if form.imageUrl.data:
      new_image = form.imageUrl.data
      new_image.filename = get_unique_filename(new_image.filename)

      old_image_url = product.imageUrl
      upload = upload_file_to_s3(new_image, old_image_url=old_image_url)

      if "url" not in upload:
        return {"errors": upload["errors"]}, 400

      product.imageUrl = upload["url"]

    db.session.commit()

    updated_product = {
      "id": productId,
      "name": product.name,
      "type": product.type,
      "genre": product.genre,
      "price": product.price,
      "description": product.description,
      "imageUrl": product.imageUrl
    }

    return updated_product, 200
    # return {"message": "Product updated successfully.", "product": updated_product.to_dict()}, 200

  if form.errors:
          return form.errors, 400

  #just in case in other errors
  return {"errors": "Invalid requests"}, 400

  # product = Product.query.get(productId)
  # data = request.get_json()
  # if(product):
  #   if(product.get_userId != current_user.id):
  #     return {'message': 'Requires proper authorization!'}, 403
  #   if "name" in data:
  #     product.name = data["name"]
  #   if "type" in data:
  #     product.type = data["type"]
  #   if "genre" in data:
  #     product.genre = data["genre"]
  #   if "price" in data:
  #     product.price = data["price"]
  #   if "description" in data:
  #     product.description = data["description"]
  #   if "imageUrl" in data:
  #     product.imageUrl = data["imageUrl"]
  #   try:
  #     db.session.commit()
  #     return {'product': product.to_dict()}
  #   except Exception as e:
  #     db.session.rollback()
  #     return {'message': 'Error updating Product', 'error': str(e)}, 400
  # else:
  #   return {'message': 'Product could not be found!'}, 404


# REVIEWS Get all reviews by product's id
@product_routes.route('/<int:productId>/reviews')
def product_reviews(productId):
  product = Product.query.get(productId)
  productReviews = product.get_reviews
  for index, review in enumerate(productReviews):
    productReviews[index]["artistName"] = User.query.get(review['userId']).to_dict()['artistName']
  if product:
    return {"reviews": productReviews}
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
