from app.models import db, Image, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_images():
    plant_1_img_1 = Image(plant_id=1 , url='https://i.etsystatic.com/6916338/r/il/d818ff/1332210144/il_794xN.1332210144_e240.jpg' )
    plant_2_img_1 = Image(plant_id=2, url='https://i.etsystatic.com/18193121/r/il/df7c73/2191089335/il_794xN.2191089335_n3d5.jpg' )
    plant_3_img_1 = Image(plant_id=3, url='https://i.etsystatic.com/22078381/r/il/d8e29b/4084542997/il_794xN.4084542997_7mbe.jpg' )
    plant_4_img_1 = Image(plant_id=4, url='https://i.etsystatic.com/24205493/r/il/89604f/4249594526/il_794xN.4249594526_bolp.jpg' )
    plant_5_img_1 = Image(plant_id=5, url='https://i.etsystatic.com/21450930/r/il/eecd07/3312099260/il_794xN.3312099260_1spd.jpg' )
    plant_6_img_1 = Image(plant_id=6, url='https://i.etsystatic.com/7795802/r/il/b2d3eb/4026937965/il_794xN.4026937965_7zsu.jpg' )
    plant_7_img_1 = Image(plant_id=7, url='https://i.etsystatic.com/13356203/r/il/8cb151/2923651420/il_794xN.2923651420_ldim.jpg' )
    plant_8_img_1 = Image(plant_id=8, url='https://i.etsystatic.com/9060073/r/il/96a911/4279828642/il_794xN.4279828642_8ycq.jpg' )
    plant_9_img_1 = Image(plant_id=9, url='https://i.etsystatic.com/23131452/r/il/826a92/3067634088/il_794xN.3067634088_f09m.jpg' )
    plant_10_img_1 = Image(plant_id=10, url='https://i.etsystatic.com/23378564/r/il/5a0366/2393912328/il_794xN.2393912328_4sdb.jpg' )
    plant_11_img_1 = Image(plant_id=11, url='https://mobileimages.lowes.com/productimages/326e6e5c-c469-4165-b066-d29b55f6b822/11391252.jpg?size=pdhism' )
    plant_12_img_1 = Image(plant_id=12, url='https://ecophiles.com/wp-content/uploads/2017/09/35184120724_1714331cff_o.jpg' )
    plant_13_img_1 = Image(plant_id=13, url='https://www.familyhandyman.com/wp-content/uploads/2019/04/shutterstock_675593308-plant.jpg?fit=696,696' )
    plant_14_img_1 = Image(plant_id=14, url='https://assets.dragoart.com/images/9207_501/how-to-draw-a-piranha-plant-piranha-plant-mario_5e4c92d229d7c1.81910968_40158_3_3.png' )
    plant_15_img_1 = Image(plant_id=15, url='https://hypixel.net/attachments/2483139/' )
    plant_16_img_1 = Image(plant_id=16, url='https://www.wellandgood.com/wp-content/uploads/2020/08/Stocksy-Lumina-unique-plant-pots.jpg')
    plant_17_img_1 = Image(plant_id=17, url='https://m.media-amazon.com/images/I/61PqD9ZfVzL.jpg' )
    plant_18_img_1 = Image(plant_id=18, url='https://m.media-amazon.com/images/I/51FSawVV59L._AC_.jpg' )
    plant_19_img_1 = Image(plant_id=19, url='https://pyxis.nymag.com/v1/imgs/201/135/14c064319fb8526f51432b4db007e0d025.rsquare.w600.jpg' )
    plant_20_img_1 = Image(plant_id=20, url='https://cdn.thisiswhyimbroke.com/buying-guides/633/koala-planter.jpg' )

    all_plant_images = [plant_1_img_1, plant_2_img_1, plant_3_img_1, plant_4_img_1, plant_5_img_1, plant_6_img_1, plant_7_img_1, plant_8_img_1, plant_9_img_1, plant_10_img_1, plant_11_img_1, plant_12_img_1, plant_13_img_1, plant_14_img_1, plant_15_img_1, plant_16_img_1, plant_17_img_1, plant_18_img_1, plant_19_img_1, plant_20_img_1]
    add_plant_images = [db.session.add(plant_img) for plant_img in all_plant_images]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
