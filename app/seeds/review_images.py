from app.models import db, ReviewImage, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_review_images():
    review_image1 = ReviewImage(review_id=1, url="https://i.etsystatic.com/iap/c6680e/4057075362/iap_300x300.4057075362_fdtosz42.jpg?version=0")
    review_image2 = ReviewImage(review_id=2, url="https://i.etsystatic.com/iap/440408/2962634540/iap_300x300.2962634540_9wg591i4.jpg?version=0")
    review_image3 = ReviewImage(review_id=3, url="https://i.etsystatic.com/iap/91cb10/4363615195/iap_300x300.4363615195_bn11xnv6.jpg?version=0")
    review_image4 = ReviewImage(review_id=4, url="https://i.etsystatic.com/iap/4ad548/4369521094/iap_300x300.4369521094_6udqo4ay.jpg?version=0")
    review_image5 = ReviewImage(review_id=5, url="https://i.etsystatic.com/iap/2f94c8/3887360474/iap_300x300.3887360474_11r71yub.jpg?version=0")
    review_image6 = ReviewImage(review_id=6, url="https://i.etsystatic.com/iap/b096ee/4339482288/iap_300x300.4339482288_bd799keg.jpg?version=0")
    review_image7 = ReviewImage(review_id=7, url="https://i.etsystatic.com/iap/cfcd87/4472167683/iap_300x300.4472167683_8ztoehdz.jpg?version=0")
    review_image8 = ReviewImage(review_id=8, url="https://i.etsystatic.com/iap/0fdaec/4129409270/iap_300x300.4129409270_sq0jzlpa.jpg?version=0")
    review_image9 = ReviewImage(review_id=9, url="https://i.etsystatic.com/iap/716696/4136236175/iap_300x300.4136236175_opi7mmi4.jpg?version=0")
    review_image10 = ReviewImage(review_id=10, url="https://i.etsystatic.com/iap/8ca507/4326152086/iap_300x300.4326152086_1dnxxooz.jpg?version=0")
    review_image11 = ReviewImage(review_id=11, url="https://i.etsystatic.com/iap/12ce00/4147264060/iap_300x300.4147264060_bg1bjwza.jpg?version=0")
    review_image12 = ReviewImage(review_id=12, url="https://i.etsystatic.com/iap/804e38/4242364703/iap_300x300.4242364703_e9xyeum0.jpg?version=0")
    review_image13 = ReviewImage(review_id=13, url="https://i.etsystatic.com/iap/7783d9/4526965380/iap_300x300.4526965380_gt8r9ews.jpg?version=0")
    review_image14 = ReviewImage(review_id=14, url="https://i.etsystatic.com/iap/e81ce3/4549780392/iap_300x300.4549780392_ij5s0g0s.jpg?version=0")
    review_image15 = ReviewImage(review_id=15, url="https://i.etsystatic.com/iap/4abe4d/4185031244/iap_300x300.4185031244_5hs2ryqx.jpg?version=0")
    review_image16 = ReviewImage(review_id=16, url="https://i.etsystatic.com/iap/301bcb/3703903312/iap_300x300.3703903312_m5s230fi.jpg?version=0")
    review_image17 = ReviewImage(review_id=17, url="https://i.etsystatic.com/iap/d642da/3953721691/iap_300x300.3953721691_fn2maq3n.jpg?version=0")
    review_image18 = ReviewImage(review_id=18, url="https://i.etsystatic.com/iap/c8d862/3494657583/iap_300x300.3494657583_hsetyj7k.jpg?version=0")
    review_image19 = ReviewImage(review_id=19, url="https://i.etsystatic.com/iap/013084/3773233286/iap_300x300.3773233286_q20wz8vr.jpg?version=0")
    review_image20 = ReviewImage(review_id=20, url="https://i.etsystatic.com/iap/97b171/4173094218/iap_300x300.4173094218_mggkg2zf.jpg?version=0")

    all_review_images = [review_image1, review_image2, review_image3, review_image4, review_image5, review_image6, review_image7, review_image8, review_image9, review_image10, review_image11, review_image12, review_image13, review_image14, review_image15, review_image16, review_image17, review_image18, review_image19, review_image20]
    add_review_images = [db.session.add(review_image) for review_image in all_review_images]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM review_images")

    db.session.commit()
