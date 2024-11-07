from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Optional
from app.aws_helpers import ALLOWED_EXTENSIONS

class EditProfileForm(FlaskForm):
    artistName = StringField('artistName', validators=[DataRequired(message="Artist Name is required")])
    bio = TextAreaField('bio', validators=[Optional()])
    profileImageUrl = FileField('profileImage', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    bannerImageUrl = FileField('bannerImage', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Update Profile')
