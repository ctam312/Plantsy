from flask import Blueprint, jsonify, request, session, redirect
from flask_login import login_required
from app.forms.plant_form import PlantForm
from app.models import Plant, db

plants_routes = Blueprint('plants_routes', __name__)

# GET ROUTES
@plants_routes.route("/")
def plants_home():
    allPlants = Plant.query.all()
    return {"allPlants": [plant.to_dict() for plant in allPlants]}

