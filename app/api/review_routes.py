from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import EditProductForm
from app.forms import NewProductForm


review_routes = Blueprint('reviews', __name__)

# Update and return an existing review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def editReview(reviewId):
  review = Review.query.get(reviewId)
  if review is None:
    return {'message': 'Review could not be found!'}, 404
  if(review.get_userId != current_user.id):
    return {'message': 'Requires proper authorization!'}, 403
  data = request.get_json()
  if "review" in data:
    review.review = data["review"]
  try:
    db.session.commit()
    return {'review': review.to_dict()}
  except Exception as e:
    db.session.rollback()
    return {'message': 'Error updating Product', 'error': str(e)}, 400

# Delete an existing Review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def deleteReview(reviewId):
  review = Review.query.get(reviewId)
  if review is None:
    return {'message': 'Review could not be found!'}, 404
  if(review.get_userId != current_user.id):
      return {'message': 'Requires proper authorization!'}, 403
  if(review):
    db.session.delete(review)
    db.session.commit()
    return {"message": "Review successfully deleted"}
