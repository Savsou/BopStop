from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import EditProductForm
from app.forms import NewProductForm


review_routes = Blueprint('reviews', __name__)

#add user verification before editing
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def editReview(reviewId):
  review = Review.query.get(reviewId)
  if(review):
    #edit the review
    return "edit this"
  else:
    return {'message': 'Review not found!'}, 404


#add user verification before deleting
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def deleteReview(reviewId):
  review = Review.query.get(reviewId)
  if(review):
    db.session.delete(review)
    db.session.commit()
    return {"message": "Review successfully deleted"}
  else:
    return {'message': 'Review not found!'}, 404
