from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review


class EditReviewForm(FlaskForm):
  review = StringField('review', validators=[DataRequired(message='Please enter a review for this product.')])
