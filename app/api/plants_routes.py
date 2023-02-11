from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required
from app.forms.plant_form import PlantForm
from app.models import Plant, db

plants_routes = Blueprint('plants_routes', __name__)

# GET ROUTES
@plants_routes.route("/")
def plants_home():
    all_plants = Plant.query.all()
    return {"all_plants": [plant.to_dict() for plant in all_plants]}

@plants_routes.route("/<int:plantId>")
def plant_details(plantId):
    plant = Plant.query.get(plantId)
    return plant.to_dict()
