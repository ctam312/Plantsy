from flask import Blueprint, jsonify, session, request
from ..models.review import Review

review_routes = Blueprint('review', __name__)


@review_routes.route('/<int:plantId>/reviews') #  ****  throw this into plants route *****
def all_reviews(plantId):
  """ Route to return and display all the reviews of a plant """
  reviews = Review.query.filter(Review.plant_id == plantId) #.join user table, review images
  return to_dict(reviews)
