from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class PlantForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired('Plant must have name.')])
    price = StringField('Price', validators=[DataRequired('Plant must have name.')])
    details = StringField('Details', validators=[DataRequired('Plant must have name.')])
    preview_image_url = StringField('Preview Image URL', validators=[DataRequired('Plant must have name.')])
    user_id = IntegerField('User ID', validators=[DataRequired()])