from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required
from app.forms.plant_form import PlantForm
from app.forms.review_form import ReviewForm
from app.models import Plant, Review, db
from app.api.auth_routes import validation_errors_to_error_messages
from sqlalchemy import func

plants_routes = Blueprint('plants_routes', __name__)

# GET ROUTES
@plants_routes.route("/")
def plants_home():
    print('PLANT ROUTES R BUSSIN IT DOWN')
    allPlants = Plant.query.all()
    return {"allPlants": [plant.to_dict() for plant in allPlants]}

@plants_routes.route("/<int:plantId>")
def plant_details(plantId):
    plant = Plant.query.get(plantId)
    return plant.to_dict()

#POST ROUTE
@plants_routes.route('/', methods = ["POST"])
@login_required
def create_plants_listing():
    form = PlantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        plant = Plant(
            name = data['name'],
            price = data['price'],
            details = data['details'],
            preview_image_url = data['preview_image_url'],
            user_id = data['user_id']
        )

        db.session.add(plant)
        db.session.commit()
        return plant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#PUT ROUTE
@plants_routes.route("/<int:plantId>", methods = ["PUT"])
@login_required
def edit_plants_listing(plantId):
    form = PlantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        plant = Plant.query.get(plantId)
        plant.name = data['name'],
        plant.price = data['price'],
        plant.details = data['details'],
        plant.preview_image_url = data['preview_image_url'],
        plant.user_id = data['user_id']

        db.session.commit()
        return plant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#DELETE ROUTE
@plants_routes.route("/<int:plantId>", methods=["DELETE"])
@login_required
def delete_plant(plantId):
    plant = Plant.query.get(plantId)
    db.session.delete(plant)
    db.session.commit()
    return {
        "statusCode": 200,
        "message": "deleted successfully"
    }


# GET Reviews of a Plant
@plants_routes.route('/<int:plantId>/reviews') #  ****  throw this into plants route *****
def all_reviews(plantId):
  """ Route to return and display all the reviews of a plant """
  reviews = Review.query.filter(Review.plant_id == plantId) #.join user table, review images
  # return reviews.to_dict(), 200
  avg_star_rating = db.session.query(func.avg(Review.stars)).filter(Review.plant_id == plantId).scalar()
  print("AVERATE STAR RATING =========================> <=======================", avg_star_rating)
  review_dicts = [review.to_dict() for review in reviews]
  for review_dict in review_dicts:
    review_dict['avg_star_rating'] = avg_star_rating
  return review_dicts, 200

# Create Review for Plant
@plants_routes.route('/<int:plantId>/reviews/', methods=['POST'])
@login_required
def create_review():
    """Route to create a new review"""
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
      params = {
        "review": form.data['review'],
        "stars": form.data['stars'],
        "url": form.data['url'],
        "plant_id": form.data['plant_id'],
        'user_id': form.data['user_id']
      }

      review = Review(**params)
      print("REVIEW =================> ROUTER", review)

      # request_data = request.get_json()
      # new_review = Review(request_data)
      db.session.add(review)
      db.session.commit()
      return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
