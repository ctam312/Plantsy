from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = "images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    plant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("plants.id")),  nullable=False)
    url = db.Column(db.String, nullable=False)

    plant = db.relationship("Plant", back_populates="image")

    def to_dict(self):
        return {
            'id': self.id,
            'plant_id': self.plant_id
            'url': self.url

            # 'plant': self.plant.to_dict()
        }
