from .db import db, environment, SCHEMA, add_prefix_for_prod

class Plant(db.Model):
    __tablename__ = "plants"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    details = db.Column(db.String, nullable=False)
    preview_image_url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship("User", back_populates="plant")
    review = db.relationship("Review", back_populates="plant")
    image = db.relationship("Image", back_populates="plant")
    cart_item = db.relationship("CartItem", back_populates="plant")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price
            'details': self.details
            'preview_image_url': self.preview_image_url
            'user_id': self.user_id

            'user': self.user.to_dict()
            'review': self.review.to_dict()
            'image': self.image.to_dict()
            'cart_item': self.cart_item.to_dict()
        }
