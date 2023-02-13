from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required
from app.forms.plant_form import PlantForm
from app.models import Plant, db
from app.api.auth_routes import validation_errors_to_error_messages

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
