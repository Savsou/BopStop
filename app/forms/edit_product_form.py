from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, SelectField, DecimalField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, Optional
from app.models import Product, User
from app.aws_helpers import ALLOWED_EXTENSIONS


class EditProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired(message='Please enter a name stating what the item is.')])
  type = SelectField(
        'type',
        choices=[
            ('', 'Select...'),
            ('music', '--- Music ---'),
            ('cd', 'Compact Disc (CD)'),
            ('cassette', 'Cassette'),
            ('vinyl_lp', 'Vinyl LP'),
            ('double_vinyl_lp', '2 x Vinyl LP'),
            ('vinyl_7', '7" Vinyl'),
            ('vinyl_box_set', 'Vinyl Box Set'),
            ('other_vinyl', 'Other Vinyl'),

            ('apparel', '--- Apparel ---'),
            ('t_shirt', 'T-Shirt/Shirt'),
            ('sweater_hoodie', 'Sweater/Hoodie'),
            ('hat', 'Hat'),
            ('other_apparel', 'Other Apparel'),

            ('miscellaneous', '--- Miscellaneous ---'),
            ('dvd', 'DVD'),
            ('usb_flash_drive', 'USB Flash Drive'),
            ('sheet_music', 'Sheet Music'),
            ('poster_print', 'Poster/Print'),
            ('ticket', 'Ticket'),
            ('book_magazine', 'Book/Magazine'),
            ('button_pin_patch', 'Button/Pin/Patch'),
            ('bag', 'Bag'),
            ('other', 'Other'),
        ],
        validators=[DataRequired("Please select a type for this item.")]
    )
  genre = SelectField(
        'genre',
        choices=[
            ('', 'Select...'),
            ('electronic', 'Electronic'),
            ('metal', 'Metal'),
            ('rock', 'Rock'),
            ('alternative', 'Alternative'),
            ('hip_hop_rap', 'Hip-Hop/Rap'),
            ('experimental', 'Experimental'),
            ('punk', 'Punk'),
            ('pop', 'Pop'),
            ('ambient', 'Ambient'),
        ]
    )
  price = DecimalField('price', validators=[DataRequired(message="Please enter a price."), NumberRange(min=0.01, message='Price must be a positive number!')])
  description = StringField('description', validators=[DataRequired(message="Please provide a description for this item.")])
  imageUrl = FileField('imageUrl', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  submit = SubmitField('Update Profile')
