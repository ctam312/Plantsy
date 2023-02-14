from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingSession(db.Model):
    __tablename__ = "shopping_sessions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    total_price = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="shopping_session")
    cart_item = db.relationship("CartItem", back_populates="shopping_session", cascade="all, delete")
