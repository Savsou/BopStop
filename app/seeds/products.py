from app.models import db, environment, SCHEMA, Product
from sqlalchemy.sql import text

def seed_products():
    products_data = [
        {
            'name': 'Adele - 30',
            'userId': 1,
            'type': 'CD',
            'price': 14.99,
            'description': "Adele's highly anticipated album showcasing her powerful vocals and emotional lyrics.",
            'imageUrl': '.../seed-images/products/Adele-30(CD).jpg',
        },
        {
            'name': 'Taylor Swift - Evermore',
            'userId': 2,
            'type': 'Vinyl',
            'price': 24.99,
            'description': 'The ninth studio album by Taylor Swift, featuring her signature storytelling style.',
            'imageUrl': '.../seed-images/products/TaylorSwift-Evermore(Vinyl).jpg',
        },
        {
            'name': 'Ed Sheeran - Equals',
            'userId': 3,
            'type': 'CD',
            'price': 14.99,
            'description': "Ed Sheeran's latest studio album filled with heartfelt ballads and catchy tunes.",
            'imageUrl': '.../seed-images/products/EdSheeran-Equals(CD).jpg',
        },
        {
            'name': 'Beyonce - Lemonade',
            'userId': 4,
            'type': 'Vinyl',
            'price': 24.99,
            'description': 'A conceptual album that explores themes of infidelity and empowerment.',
            'imageUrl': '.../seed-images/products/BeyonceLemonade(Vinyl).jpg',
        },
        {
            'name': 'Katy Perry - Smile',
            'userId': 5,
            'type': 'T-Shirt',
            'price': 19.99,
            'description': "A stylish t-shirt featuring artwork from Katy Perry's album 'Smile.'",
            'imageUrl': '.../seed-images/products/KatyPerry-Smile(T-Shirt).jpg',
        },
        {
            'name': 'Bruno Mars - 24K Magic',
            'userId': 6,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "Bruno's third studio album featuring funky beats and smooth melodies.",
            'imageUrl': '.../seed-images/products/BrunoMars-24KMagic(Vinyl).jpg',
        },
        {
            'name': 'Billie Eilish - Happier Than Ever',
            'userId': 7,
            'type': 'CD',
            'price': 14.99,
            'description': "Billie's introspective album featuring her unique sound and style.",
            'imageUrl': '.../seed-images/products/BillieEilish-HappierThanEver(CD).jpg',
        },
        {
            'name': 'Lady Gaga - Chromatica',
            'userId': 8,
            'type': 'T-Shirt',
            'price': 19.99,
            'description': "A fashionable t-shirt inspired by Lady Gaga's album 'Chromatica.'",
            'imageUrl': '.../seed-images/products/LadyGaga-Chromatica(T-Shirt).jpg',
        },
        {
            'name': 'Kendrick Lamar - Mr. Morale & The Big Steppers',
            'userId': 9,
            'type': 'CD',
            'price': 14.99,
            'description': "Kendrick's highly acclaimed album exploring personal and societal themes.",
            'imageUrl': '.../seed-images/products/KendrickLamar-Mr.Morale&TheBigSteppers(CD).jpg',
        },
        {
            'name': 'Rihanna - Anti',
            'userId': 10,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "A critically acclaimed album that marks a shift in Rihanna's musical style.",
            'imageUrl': '.../seed-images/products/Rihanna-Anti(Vinyl).jpg',
        },
        {
            'name': 'Justin Bieber - Justice',
            'userId': 11,
            'type': 'CD',
            'price': 14.99,
            'description': 'An album filled with themes of healing and love.',
            'imageUrl': '.../seed-images/products/JustinBieber-Justice(CD).jpg',
        },
        {
            'name': 'Dua Lipa - Future Nostalgia',
            'userId': 12,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "Dua's second studio album that brings retro vibes with a modern twist.",
            'imageUrl': '.../seed-images/products/DuaLipa-FutureNostalgia(Vinyl).jpg',
        },
        {
            'name': 'Shawn Mendes - Wonder',
            'userId': 13,
            'type': 'CD',
            'price': 14.99,
            'description': "An album that showcases Shawn's emotional depth and musical growth.",
            'imageUrl': '.../seed-images/products/ShawnMendes-Wonder(CD).jpg',
        },
        {
            'name': 'Sia - Music - Songs from and Inspired by the Motion Picture',
            'userId': 14,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "A collection of songs from Sia's feature film debut.",
            'imageUrl': '.../seed-images/products/Sia-Music-SongsfromandInspiredbytheMotionPicture(Vinyl).jpg',
        },
        {
            'name': 'The Weeknd - After Hours',
            'userId': 15,
            'type': 'CD',
            'price': 14.99,
            'description': "The Weeknd's fourth studio album featuring his signature sound.",
            'imageUrl': '.../seed-images/products/TheWeeknd-AfterHours(CD).jpg',
        },
        {
            'name': "Post Malone - Hollywood's Bleeding",
            'userId': 16,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "A genre-blending album that showcases Post Malone's versatility.",
            'imageUrl': '.../seed-images/products/PostMalone-HollywoodsBleeding(Vinyl).jpg',
        },
        {
            'name': 'Ariana Grande - Positions',
            'userId': 17,
            'type': 'CD',
            'price': 14.99,
            'description': "Ariana's sixth studio album that highlights her vocal range.",
            'imageUrl': '.../seed-images/products/ArianaGrande-Positions(CD).jpg',
        },
        {
            'name': 'Travis Scott - UTOPIA',
            'userId': 18,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "Travis Scott's highly anticipated album featuring a diverse range of sounds.",
            'imageUrl': '.../seed-images/products/TravisScott-UTOPIA(Vinyl).jpg',
        },
        {
            'name': 'Imagine Dragons - Mercury - Act 1',
            'userId': 19,
            'type': 'CD',
            'price': 14.99,
            'description': "An album that captures the band's evolving sound.",
            'imageUrl': '.../seed-images/products/ImagineDragons-Mercury-Act1(CD).jpg',
        },
        {
            'name': 'Coldplay - Music of the Spheres',
            'userId': 20,
            'type': 'Vinyl',
            'price': 24.99,
            'description': "Coldplay's latest album, exploring new sonic landscapes.",
            'imageUrl': '.../seed-images/products/Coldplay-MusicoftheSpheres(Vinyl).jpg',
        },
    ]

    db.session.bulk_insert_mappings(Product, products_data)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
