from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange


class ReviewImageForm(FlaskForm):
  review_id = IntegerField("Review_id", validators=[DataRequired()])
  url = StringField("Url", validators=[DataRequired()])
