from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, Length

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired(), Length(min=1, max=1000, message='Reviews must be 1 - 1000 characters long')])
    stars  = IntegerField("Stars", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5")])
    # image = StringField("Image")
    plant_id = IntegerField("Plant ID", validators=[DataRequired()])
    user_id = IntegerField("User ID", validators=[DataRequired()])
