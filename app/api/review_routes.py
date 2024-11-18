from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import EditReviewForm




review_routes = Blueprint('reviews', __name__)

# Update and return an existing review
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
  review = Review.query.get(reviewId)
  if review is None:
    return {'message': 'Review could not be found!'}, 404
  if(review.get_userId != current_user.id):
    return {'message': 'Requires proper authorization!'}, 403

  form = EditReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review.review = form.review.data
  if(form.errors):
    return form.errors, 400
  try:
    db.session.commit()
    return {'review': review.to_dict()}
  except Exception as e:
    db.session.rollback()
    return {'message': 'Error updating Product', 'error': str(e)}, 400

# Delete an existing Review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
  review = Review.query.get(reviewId)
  if review is None:
    return {'message': 'Review could not be found!'}, 404
  if(review.get_userId != current_user.id):
      return {'message': 'Requires proper authorization!'}, 403
  if(review):
    db.session.delete(review)
    db.session.commit()
    return {"message": "Review successfully deleted"}

# Get current User's Reviews
@review_routes.route('/current')
@login_required
def user_reviews():
  user = current_user.to_dict()
  return user["reviews"]
