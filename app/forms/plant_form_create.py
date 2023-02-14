from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired

class PlantFormCreate(FlaskForm):
    name = StringField('Name', validators=[DataRequired('Plant must have name.')])
    price = FloatField('Price', validators=[DataRequired('Price for plant is required.')])
    details = StringField('Details', validators=[DataRequired('Please give us some details about your plant.')])
    preview_image_url = StringField('Preview Image URL', validators=[DataRequired('Please provide an image of your plant.')])
    user_id = IntegerField('User ID', validators=[DataRequired()])