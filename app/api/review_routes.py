from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..models.review import Review
from ..forms.review_form import ReviewForm
from ..models import db
from ..models.review_image import ReviewImage
from ..forms.review_image_form import ReviewImageForm

review_routes = Blueprint('review', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# # get all reviews of a spot
# @review_routes.route('/<int:plantId>/reviews') #  ****  throw this into plants route *****
# def all_reviews(plantId):
#   """ Route to return and display all the reviews of a plant """
#   reviews = Review.query.filter(Review.plant_id == plantId) #.join user table, review images
#   print('print --------------->', reviews)
#   # return reviews.to_dict(), 200
#   return [review.to_dict() for review in reviews], 200 # add somethign to check if there is even anything inside the query, if not repond with an error

# create a review
# @review_routes.route('/<int:plantId>/reviews', methods=['POST'])
# @login_required
# def create_review():
#     """Route to create a new review"""
#     form = ReviewForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]
#     if form.validate_on_submit():
#       params = {
#         "review": form.data['review'],
#         "stars": form.data['stars'],
#         "url": form.data['url'],
#         "plant_id": form.data['plant_id'],
#         'user_id': form.data['user_id']
#       }

#       review = Review(**params)

#       # request_data = request.get_json()
#       # new_review = Review(request_data)
#       db.session.add(review)
#       db.session.commit()
#       return review.to_dict()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#create review v2
# @review_routes.route('/<int:plantId>/reviews', methods=['POST'])
# @login_required
# def create_review():
  # """ Route to create a new review """
#   form = ReviewForm()
#   if form.validate_on_submit():
#     request_data = request.get_json()
#     new_review = Review(
#       review=request_data.get('review'),
#       stars=request_data.get('stars'),
#       plant_id=plantId
#     )
#     db.session.add(new_review)
#     db.session.commit()
#     return new_review.to_dict()
#   return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
  """ Route to edit a review """
  review = Review.query.get(reviewId)
  print("SINGLE REVIEW ID =======>", review)
  if review is None:
    return 'error, review not found', 404

  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  data = form.data
  if form.validate_on_submit():
    review.review = data['review']
    review.stars = data['stars']
    review.plant_id = data['plant_id']
    review.user_id = data['user_id']
    db.session.commit()
    return review.to_dict(), 200

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# # delete a review
# @review_routes.route('/<int:reviewId>', methods=['DELETE'])
# @login_required
# def delete_review(reviewId):
#   """ Route to delete a review """
#   review = Review.query.get(reviewId)
#   if review is None:
#     return 'error, review not found', 404
#   db.session.delete(review)
#   db.session.commit()
#   return "Review deleted successfully", 200

# add review image
@review_routes.route('/<int:reviewId>/images', methods=['POST'])
@login_required
def add_review_image(reviewId):
  """ Route to add a image to a review """
  form = ReviewImageForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  if form.validate_on_submit():
    params = {
        "url": form.data['url'],
        "review_id": reviewId,
      }
    new_review_image = ReviewImage(**params)
    db.session.add(new_review_image)
    db.session.commit()
    return new_review_image.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
