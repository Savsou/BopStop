from flask import Blueprint, request
from flask_login import login_required
from app.models import Product, db

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def products():
  products = Product.query.all()
  return {"products": [product.to_dict() for product in products]}

@product_routes.route('/<int:productId>')
def product(productId):
  product = Product.query.get(productId)
  return product.to_dict()

  #routes below are not tested, required to login

@product_routes.route('/<int:productId>', methods=["DELETE"])
@login_required
def deleteProduct(productId):
  product = Product.query.get(productId)
  if(product):
    db.session.delete(product)
    db.session.commit()
    return {"message": "Product successfully deleted"}
  else:
    return {"message": "Product not found!"}, 404

@product_routes.route('/', methods=["POST"])
@login_required
def createProduct():
  """
  Creates a new Product
  """
  form = newProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    newProduct = Product(
      name=form.data['name'],
      type=form.data['type'],
      genre=form.data['genre'],
      price=form.data['price'],
      description=form.data['description'],
      imageUrl=form.data['imageUrl']
    )
    db.session.add(newProduct)
    db.session.commit()
    #redirect to GET product by id
    return newProduct.to_dict(), 201
  return form.errors, 400

@product_routes.route('/<int:productId>', methods=["PUT"])
@login_required
def updateProduct(productId):
  """
  Update a User's Product
  """
  form = editProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  product = Product.query.get(productId)
  if(product):
    data = request.get_json()
    if "name" in data:
      product["name"] = data["name"]
    if "type" in data:
      product["type"] = data["type"]
    if "genre" in data:
      product["genre"] = data["genre"]
    if "price" in data:
      product["price"] = data["price"]
    if "description" in data:
      product["description"] = data["description"]
    if "imageUrl" in data:
      product["imageUrl"] = data["imageUrl"]

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
