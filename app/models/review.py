from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(200), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("plants.id")), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    plant = db.relationship("Plant", back_populates="review")
    user = db.relationship("User", back_populates="review")
    review_image = db.relationship("ReviewImage", back_populates="review")
