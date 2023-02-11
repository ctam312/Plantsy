from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    stars  = IntegerField("Stars", validators=[DataRequired(), NumberRange(min=1, max=5, message="Rating must be between 1 and 5")])
    plant_id = IntegerField("Plant ID", validators=[DataRequired()])
    user_id = IntegerField("User ID", validators=[DataRequired()])
