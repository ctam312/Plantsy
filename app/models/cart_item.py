from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    session_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("shopping_sessions.id")), nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("plants.id")), nullable=False)

    shopping_session = db.relationship("ShoppingSession", back_populates="cart_item")
    plant = db.relationship("Plant", back_populates="cart_item")
