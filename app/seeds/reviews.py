from app.models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text

def seed_reviews():
    reviews_data = [
        {
            'review': 'Amazing product, highly recommend!',
            'productId': 1,
            'userId': 1,
        },
        {
            'review': 'Not what I expected, a bit disappointing.',
            'productId': 1,
            'userId': 2,
        },
        {
            'review': 'Great value for the price!',
            'productId': 2,
            'userId': 1,
        },
        {
            'review': 'The quality is excellent, would buy again.',
            'productId': 2,
            'userId': 3,
        },
        {
            'review': 'I loved the design, very stylish!',
            'productId': 3,
            'userId': 1,
        },
        {
            'review': 'The product arrived late, but it was worth the wait.',
            'productId': 3,
            'userId': 4,
        },
        {
            'review': 'Terrible service, will not be returning.',
            'productId': 4,
            'userId': 5,
        },
        {
            'review': 'My favorite purchase of the year!',
            'productId': 4,
            'userId': 2,
        },
        {
            'review': 'Decent quality but overpriced.',
            'productId': 5,
            'userId': 3,
        },
        {
            'review': 'Perfect for my collection!',
            'productId': 5,
            'userId': 4,
        },
        {
            'review': 'Fantastic sound quality, love it!',
            'productId': 6,
            'userId': 1,
        },
        {
            'review': 'The fabric feels cheap, not satisfied.',
            'productId': 6,
            'userId': 5,
        },
        {
            'review': 'Incredible experience with this product.',
            'productId': 7,
            'userId': 3,
        },
        {
            'review': 'Not worth the hype, very basic.',
            'productId': 7,
            'userId': 4,
        },
        {
            'review': 'I enjoy this product daily, it’s become essential!',
            'productId': 8,
            'userId': 2,
        },
        {
            'review': 'The print quality is top-notch!',
            'productId': 8,
            'userId': 5,
        },
        {
            'review': 'Love the retro vibes, perfect for gifts.',
            'productId': 9,
            'userId': 1,
        },
        {
            'review': 'Could use more variety in styles.',
            'productId': 9,
            'userId': 2,
        },
        {
            'review': 'Absolutely stunning artwork, love it!',
            'productId': 10,
            'userId': 3,
        },
        {
            'review': 'Shipping was a nightmare, but the product is great.',
            'productId': 10,
            'userId': 4,
        },
    ]

    db.session.bulk_insert_mappings(Review, reviews_data)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
