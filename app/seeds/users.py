from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    base_url = 'https://bopstop-image-bucket.s3.us-east-1.amazonaws.com'

    users_data = [
        {
            'artistName': 'Adele',
            'username': 'adele_adkins',
            'email': 'adele@example.com',
            'password': 'hashedpassword1',
            'bio': 'Hello, I am Adele!',
            'profileImageUrl': f'{base_url}/adele_adkins.jpg',
            'bannerImageUrl': f'{base_url}/adele_adkins.jpg',
        },
        {
            'artistName': 'Taylor Swift',
            'username': 'taylor_swift',
            'email': 'taylor@example.com',
            'password': 'hashedpassword2',
            'bio': 'Welcome to my world!',
            'profileImageUrl': f'{base_url}/taylor_swift_.jpg',
            'bannerImageUrl': f'{base_url}/taylor_swift_.jpg',
        },
        {
            'artistName': 'Ed Sheeran',
            'username': 'ed_sheeran',
            'email': 'ed@example.com',
            'password': 'hashedpassword3',
            'bio': 'Music is my life!',
            'profileImageUrl': f'{base_url}/ed_sheeran_.jpg',
            'bannerImageUrl': f'{base_url}/ed_sheeran_.jpg',
        },
        {
            'artistName': 'Beyonce',
            'username': 'beyonce_knowles',
            'email': 'beyonce@example.com',
            'password': 'hashedpassword4',
            'bio': 'Queen B in the house!',
            'profileImageUrl': f'{base_url}/beyonce_knowles_.jpg',
            'bannerImageUrl': f'{base_url}/beyonce_knowles_.jpg',
        },
        {
            'artistName': 'Katy Perry',
            'username': 'katy_perry',
            'email': 'katy@example.com',
            'password': 'hashedpassword5',
            'bio': "I'm just a Katycat!",
            'profileImageUrl': f'{base_url}/katy_perry_.jpg',
            'bannerImageUrl': f'{base_url}/katy_perry_.jpg',
        },
        {
            'artistName': 'Bruno Mars',
            'username': 'bruno_mars',
            'email': 'bruno@example.com',
            'password': 'hashedpassword6',
            'bio': 'Just the way you are!',
            'profileImageUrl': f'{base_url}/bruno_mars_.jpg',
            'bannerImageUrl': f'{base_url}/bruno_mars_.jpg',
        },
        {
            'artistName': 'Billie Eilish',
            'username': 'billie_eilish',
            'email': 'billie@example.com',
            'password': 'hashedpassword7',
            'bio': 'I love my fans!',
            'profileImageUrl': f'{base_url}/billie_eilish_.jpg',
            'bannerImageUrl': f'{base_url}/billie_eilish_.jpg',
        },
        {
            'artistName': 'Lady Gaga',
            'username': 'lady_gaga',
            'email': 'gaga@example.com',
            'password': 'hashedpassword8',
            'bio': 'Born this way!',
            'profileImageUrl': f'{base_url}/lady_gaga_.jpg',
            'bannerImageUrl': f'{base_url}/lady_gaga_.jpg',
        },
        {
            'artistName': 'Kendrick Lamar',
            'username': 'kendricklamer',
            'email': 'kendricklamer@example.com',
            'password': 'hashedpassword9',
            'bio': 'Not like us',
            'profileImageUrl': f'{base_url}/kendrick_lamar_.jpg',
            'bannerImageUrl': f'{base_url}/kendrick_lamar_.jpg',
        },
        {
            'artistName': 'Rihanna',
            'username': 'rihanna',
            'email': 'rihanna@example.com',
            'password': 'hashedpassword10',
            'bio': 'Shine bright like a diamond!',
            'profileImageUrl': f'{base_url}/rihanna_.jpg',
            'bannerImageUrl': f'{base_url}/rihanna_.jpg',
        },
        {
            'artistName': 'Justin Bieber',
            'username': 'justin_bieber',
            'email': 'justin@example.com',
            'password': 'hashedpassword11',
            'bio': 'Never say never!',
            'profileImageUrl': f'{base_url}/justin_bieber_.jpg',
            'bannerImageUrl': f'{base_url}/justin_bieber_.jpg',
        },
        {
            'artistName': 'Dua Lipa',
            'username': 'dua_lipa',
            'email': 'dua@example.com',
            'password': 'hashedpassword12',
            'bio': 'Future Nostalgia!',
            'profileImageUrl': f'{base_url}/dua_lipa_.jpg',
            'bannerImageUrl': f'{base_url}/dua_lipa_.jpg',
        },
        {
            'artistName': 'Shawn Mendes',
            'username': 'shawn_mendes',
            'email': 'shawn@example.com',
            'password': 'hashedpassword13',
            'bio': 'In my blood!',
            'profileImageUrl': f'{base_url}/shawn_mendes_.jpg',
            'bannerImageUrl': f'{base_url}/shawn_mendes_.jpg',
        },
        {
            'artistName': 'Sia',
            'username': 'sia_furlow',
            'email': 'sia@example.com',
            'password': 'hashedpassword14',
            'bio': 'Elastic heart!',
            'profileImageUrl': f'{base_url}/sia_.jpg',
            'bannerImageUrl': f'{base_url}/sia_.jpg',
        },
        {
            'artistName': 'The Weeknd',
            'username': 'the_weeknd',
            'email': 'weeknd@example.com',
            'password': 'hashedpassword15',
            'bio': "Can't feel my face!",
            'profileImageUrl': f'{base_url}/the_weeknd_.jpg',
            'bannerImageUrl': f'{base_url}/the_weeknd_.jpg',
        },
        {
            'artistName': 'Post Malone',
            'username': 'post_malone',
            'email': 'post@example.com',
            'password': 'hashedpassword16',
            'bio': 'Rockstar vibes!',
            'profileImageUrl': f'{base_url}/post_malone_.jpg',
            'bannerImageUrl': f'{base_url}/post_malone_.jpg',
        },
        {
            'artistName': 'Ariana Grande',
            'username': 'ariana_grande',
            'email': 'ariana@example.com',
            'password': 'hashedpassword17',
            'bio': 'Thank you, next!',
            'profileImageUrl': f'{base_url}/ariana_grande_.jpg',
            'bannerImageUrl': f'{base_url}/ariana_grande_.jpg',
        },
        {
            'artistName': 'Travis Scott',
            'username': 'travis_scott',
            'email': 'travis@example.com',
            'password': 'hashedpassword18',
            'bio': 'Astroworld vibes!',
            'profileImageUrl': f'{base_url}/travis_scott_.jpg',
            'bannerImageUrl': f'{base_url}/travis_scott_.jpg',
        },
        {
            'artistName': 'Imagine Dragons',
            'username': 'imagine_dragons',
            'email': 'imagine@example.com',
            'password': 'hashedpassword19',
            'bio': 'Believer life!',
            'profileImageUrl': f'{base_url}/imagine_dragons_.jpg',
            'bannerImageUrl': f'{base_url}/imagine_dragons_.jpg',
        },
        {
            'artistName': 'Coldplay',
            'username': 'coldplay',
            'email': 'coldplay@example.com',
            'password': 'hashedpassword20',
            'bio': 'Viva La Vida!',
            'profileImageUrl': f'{base_url}/coldplay_.jpg',
            'bannerImageUrl': f'{base_url}/coldplay_.jpg',
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
