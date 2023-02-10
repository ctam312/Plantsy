from app.models import db, Review, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    review1 = Review(review="Amazing plant!", stars=5, plant_id=1 , user_id =2)
    review2 = Review(review="This plant is so gorgeous!", stars=4, plant_id=2, user_id =2)
    review3 = Review(review="sick plant bro, definitely buying this again", stars=5, plant_id=3, user_id =2)
    review4 = Review(review="This plant was amazing", stars=4, plant_id=4, user_id = 3)
    review5 = Review(review="This plant was decent", stars=4, plant_id=5, user_id =1 )
    review6 = Review(review="This plant came almost dead, needed more water to survive", stars=3, plant_id=6, user_id =2 )
    review7 = Review(review="Best plant I ever bought from this website", stars=5, plant_id=7, user_id =2 )
    review8 = Review(review="Plant looks magnificent", stars=5, plant_id=8, user_id =1 )
    review9 = Review(review="Plant arrived dead..", stars=1, plant_id=9, user_id =2 )
    review10 = Review(review='Garbage plant…!', stars=1, plant_id=10 , user_id =2)
    review11 = Review(review="Was a decent plant, didn't look like the picture though.", stars=4, plant_id=11 , user_id =3)
    review12 = Review(review="What a wonderful plant this was. Definitely going to recommend to friends!", stars=5, plant_id=12 , user_id =1)
    review13 = Review(review="Great gift for your lady.", stars=5, plant_id=13 , user_id =1)
    review14 = Review(review="This plant drinks too much water", stars=3, plant_id=14 , user_id =2)
    review15 = Review(review="Plant was dead when I got it, wtf?", stars=1, plant_id=15 , user_id =3)
    review16 = Review(review="Sent me an onion not what was described in the image", stars=1, plant_id=16 , user_id =2)
    review17 = Review(review="This plant smells kind of weird but it looks nice", stars=2, plant_id=17 , user_id =2)
    review18 = Review(review="Great plant, especially for the price", stars=5, plant_id=18 , user_id =3)
    review19 = Review(review="Definitely buying this plant again", stars=5, plant_id=19 , user_id =1)
    review20 = Review(review="Beautiful plant", stars=4, plant_id=20, user_id =2)

    all_reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10, review11, review12, review13, review14, review15, review16, review17, review18, review19, review20]
    add_reviews = [db.session.add(review) for review in all_reviews]

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
