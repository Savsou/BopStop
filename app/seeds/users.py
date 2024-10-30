from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    users_data = [
        {
            'firstName': 'Adele',
            'lastName': 'Adkins',
            'username': 'adele_adkins',
            'email': 'adele@example.com',
            'password': 'hashedpassword1',
            'bio': 'Hello, I am Adele!',
            'profileImageUrl': '.../seed-images/users/adele_adkins.jpg',
            'bannerImageUrl': '.../seed-images/users/adele_adkins.jpg',
        },
        {
            'firstName': 'Taylor',
            'lastName': 'Swift',
            'username': 'taylor_swift',
            'email': 'taylor@example.com',
            'password': 'hashedpassword2',
            'bio': 'Welcome to my world!',
            'profileImageUrl': '.../seed-images/users/taylor_swift_.pg',
            'bannerImageUrl': '.../seed-images/users/taylor_swift_.pg',
        },
        {
            'firstName': 'Ed',
            'lastName': 'Sheeran',
            'username': 'ed_sheeran',
            'email': 'ed@example.com',
            'password': 'hashedpassword3',
            'bio': 'Music is my life!',
            'profileImageUrl': '.../seed-images/users/ed_sheeran_.jpg',
            'bannerImageUrl': '.../seed-images/users/ed_sheeran_.jpg',
        },
        {
            'firstName': 'Beyonce',
            'lastName': 'Knowles',
            'username': 'beyonce_knowles',
            'email': 'beyonce@example.com',
            'password': 'hashedpassword4',
            'bio': 'Queen B in the house!',
            'profileImageUrl': '.../seed-images/users/beyonce_knowles_.jpg',
            'bannerImageUrl': '.../seed-images/users/beyonce_knowles_.jpg',
        },
        {
            'firstName': 'Katy',
            'lastName': 'Perry',
            'username': 'katy_perry',
            'email': 'katy@example.com',
            'password': 'hashedpassword5',
            'bio': "I'm just a Katycat!",
            'profileImageUrl': '.../seed-images/users/katy_perry_.jpg',
            'bannerImageUrl': '.../seed-images/users/katy_perry_.jpg',
        },
        {
            'firstName': 'Bruno',
            'lastName': 'Mars',
            'username': 'bruno_mars',
            'email': 'bruno@example.com',
            'password': 'hashedpassword6',
            'bio': 'Just the way you are!',
            'profileImageUrl': '.../seed-images/users/bruno_mars_.jpg',
            'bannerImageUrl': '.../seed-images/users/bruno_mars_.jpg',
        },
        {
            'firstName': 'Billie',
            'lastName': 'Eilish',
            'username': 'billie_eilish',
            'email': 'billie@example.com',
            'password': 'hashedpassword7',
            'bio': 'I love my fans!',
            'profileImageUrl': '.../seed-images/users/billie_eilish_.jpg',
            'bannerImageUrl': '.../seed-images/users/billie_eilish_.jpg',
        },
        {
            'firstName': 'Lady',
            'lastName': 'Gaga',
            'username': 'lady_gaga',
            'email': 'gaga@example.com',
            'password': 'hashedpassword8',
            'bio': 'Born this way!',
            'profileImageUrl': '.../seed-images/users/lady_gaga_.jpg',
            'bannerImageUrl': '.../seed-images/users/lady_gaga_.jpg',
        },
        {
            'firstName': 'Kendrick',
            'lastName': 'Lamar',
            'username': 'kendricklamer',
            'email': 'kendricklamer@example.com',
            'password': 'hashedpassword9',
            'bio': 'Not like us',
            'profileImageUrl': '.../seed-images/users/kendrick_lamar_.jpg',
            'bannerImageUrl': '.../seed-images/users/kendrick_lamar_.jpg',
        },
        {
            'firstName': 'Rihanna',
            'lastName': 'Fenty',
            'username': 'rihanna',
            'email': 'rihanna@example.com',
            'password': 'hashedpassword10',
            'bio': 'Shine bright like a diamond!',
            'profileImageUrl': '.../seed-images/users/rihanna_.jpg',
            'bannerImageUrl': '.../seed-images/users/rihanna_.jpg',
        },
        {
            'firstName': 'Justin',
            'lastName': 'Bieber',
            'username': 'justin_bieber',
            'email': 'justin@example.com',
            'password': 'hashedpassword11',
            'bio': 'Never say never!',
            'profileImageUrl': '.../seed-images/users/justin_bieber_.jpg',
            'bannerImageUrl': '.../seed-images/users/justin_bieber_.jpg',
        },
        {
            'firstName': 'Dua',
            'lastName': 'Lipa',
            'username': 'dua_lipa',
            'email': 'dua@example.com',
            'password': 'hashedpassword12',
            'bio': 'Future Nostalgia!',
            'profileImageUrl': '.../seed-images/users/dua_lipa_.jpg',
            'bannerImageUrl': '.../seed-images/users/dua_lipa_.jpg',
        },
        {
            'firstName': 'Shawn',
            'lastName': 'Mendes',
            'username': 'shawn_mendes',
            'email': 'shawn@example.com',
            'password': 'hashedpassword13',
            'bio': 'In my blood!',
            'profileImageUrl': '.../seed-images/users/shawn_mendes_.jpg',
            'bannerImageUrl': '.../seed-images/users/shawn_mendes_.jpg',
        },
        {
            'firstName': 'Sia',
            'lastName': 'Furlow',
            'username': 'sia_furlow',
            'email': 'sia@example.com',
            'password': 'hashedpassword14',
            'bio': 'Elastic heart!',
            'profileImageUrl': '.../seed-images/users/sia_.jpg',
            'bannerImageUrl': '.../seed-images/users/sia_.jpg',
        },
        {
            'firstName': 'The',
            'lastName': 'Weeknd',
            'username': 'the_weeknd',
            'email': 'weeknd@example.com',
            'password': 'hashedpassword15',
            'bio': "Can't feel my face!",
            'profileImageUrl': '.../seed-images/users/the_weeknd_.jpg',
            'bannerImageUrl': '.../seed-images/users/the_weeknd_.jpg',
        },
        {
            'firstName': 'Post',
            'lastName': 'Malone',
            'username': 'post_malone',
            'email': 'post@example.com',
            'password': 'hashedpassword16',
            'bio': 'Rockstar vibes!',
            'profileImageUrl': '.../seed-images/users/post_malone_.jpg',
            'bannerImageUrl': '.../seed-images/users/post_malone_.jpg',
        },
        {
            'firstName': 'Ariana',
            'lastName': 'Grande',
            'username': 'ariana_grande',
            'email': 'ariana@example.com',
            'password': 'hashedpassword17',
            'bio': 'Thank you, next!',
            'profileImageUrl': '.../seed-images/users/ariana_grande_.jpg',
            'bannerImageUrl': '.../seed-images/users/ariana_grande_.jpg',
        },
        {
            'firstName': 'Travis',
            'lastName': 'Scott',
            'username': 'travis_scott',
            'email': 'travis@example.com',
            'password': 'hashedpassword18',
            'bio': 'Astroworld vibes!',
            'profileImageUrl': '.../seed-images/users/travis_scott_.jpg',
            'bannerImageUrl': '.../seed-images/users/travis_scott_.jpg',
        },
        {
            'firstName': 'Imagine',
            'lastName': 'Dragons',
            'username': 'imagine_dragons',
            'email': 'imagine@example.com',
            'password': 'hashedpassword19',
            'bio': 'Believer life!',
            'profileImageUrl': '.../seed-images/users/imagine_dragons_.jpg',
            'bannerImageUrl': '.../seed-images/users/imagine_dragons_.jpg',
        },
        {
            'firstName': 'Coldplay',
            'lastName': 'Band',
            'username': 'coldplay',
            'email': 'coldplay@example.com',
            'password': 'hashedpassword20',
            'bio': 'Viva La Vida!',
            'profileImageUrl': '.../seed-images/users/coldplay_.jpg',
            'bannerImageUrl': '.../seed-images/users/coldplay_.jpg',
        }
    ]

    #bulk_insert_mappings do not let our passsword hashing happen because it bypasses the model instantiation. Our @password.setter needs to happen on each user.
    users = [User(**data) for data in users_data]
    db.session.add_all(users)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f'TRUNCATE TABLE {SCHEMA}.users RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM users'))

    db.session.commit()
