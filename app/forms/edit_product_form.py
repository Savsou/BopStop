from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, URLField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, URL
from app.models import Product, User


class EditProductForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
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
        validators=[DataRequired()]
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
  price = DecimalField('price', validators=[DataRequired(), NumberRange(min=0.01, message='Price must be a positive number!')])
  description = StringField('description', validators=[DataRequired()])
  imageUrl = URLField('imageUrl', validators=[DataRequired(), URL()])
