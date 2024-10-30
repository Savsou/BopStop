from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, URLField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, URL
from app.models import Product, User


class EditProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  type = SelectField('type', validators=[DataRequired()])
  genre = SelectField('genre'),
  price = DecimalField('price', validators=[DataRequired(), NumberRange(min=0.01, message='Price must be a positive number!')])
  decription = StringField('description', validators=[DataRequired()])
  imageUrl = URLField('imageUrl', validators=[DataRequired(), URL()])
