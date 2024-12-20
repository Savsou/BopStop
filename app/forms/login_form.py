from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


# def user_exists(form, field):
#     # Checking if user exists
#     email_or_username = field.data

#     user = User.query.filter((User.email == email_or_username) | (User.username == email_or_username)).first()
#     if not user:
#         raise ValidationError('Login failed. Please check your credentials and try again.')


# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email_or_username = form.data['email_or_username']

#     user = User.query.filter((User.email == email_or_username) | (User.username == email_or_username)).first()
#     if not user:
#         raise ValidationError('Login failed. Please check your credentials and try again.')
#     if not user.check_password(password):
#         raise ValidationError('Login failed. Please check your credentials and try again.')


class LoginForm(FlaskForm):
    email_or_username = StringField('email_or_username', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
