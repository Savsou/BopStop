# BopStop

BopStop is a full stack partial clone of the e-commerce website Bandcamp. This platform serves as a hub for music creators and fans, enabling artists to share and sell their music while fostering a community of listeners who can explore, purchase, and support their favorite sounds and merchandise.

# Live Link

https://bopstop.onrender.com/

## Tech Stack

### Frameworks and Libraries
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://img.shields.io/badge/-Python-3776ab?logo=python&logoColor=FFFF66&logoWidth=20" alt="Python" height="25">
  <img src="https://img.shields.io/badge/-Flask-000000?logo=flask&logoColor=white&logoWidth=20" alt="Flask" height="25">
  <img src="https://img.shields.io/badge/-Javascript-41454A?logo=javascript&logoColor=F7DF1E&logoWidth=20" alt="Javascript" height="25">
  <img src="https://img.shields.io/badge/-React-263238?logo=react&logoColor=61DAFB&logoWidth=20" alt="React" height="25">
  <img src="https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&logoWidth=20" alt="Redux" height="25">
  <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&logoWidth=20" alt="CSS3" height="25">
  <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=white&logoWidth=20" alt="HTML5" height="25">
</div>

### Database:

<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&logoWidth=20" alt="PostgreSQL" height="25">

### Hosting:

<img src="https://img.shields.io/badge/-Render-23c43e?logo=render&logoColor=white&logoWidth=20" alt="Render" height="25">

### Index

[Feature List](https://github.com/Savsou/BopStop/wiki/Feature-List) | [Database Schema](https://github.com/Savsou/BopStop/wiki/DB-Schema) | [User Stories](https://github.com/Savsou/BopStop/wiki/User-Stories)

### Landing Page

<img src="https://github.com/Savsou/BopStop/blob/dev/assets/ezgif-7-02ffb16eda.gif" alt="Demo Animation" width="830">

### Product Page

<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGExcGlzbGpja3E0OTJtNmFxazN3Nm0wbjY0bWQzcGR3d3p2azJ6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y5iGXr36XEWLgBjaaJ/giphy.gif" alt="Demo Animation" width="830">

### Wishlist

<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnNmOTVveHp5MndpZnRnd2dqdTV5b2ZoOXE0ejRkcnBic3RwbnJqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V95hhGkt3aoyg9ImIc/giphy.gif" alt="Demo Animation" width="830">

### Cart
<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGhxbnU2dHNndmppY3RpdzI2cHk4Y29vaTRjMmdyd3p4cWl5eWNrOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UmhJWC3rs3C4WHi7FL/giphy.gif" alt="Demo Animation" width="830">

### Connect With Team BopStop:

#### Savannah Sou:

[<img align="left" alt="SavonnaSou | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][savannah-linkedin]

[savannah-linkedin]: https://www.linkedin.com/in/savannah-sou/

[<img align="left" alt="SavonnaSou | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][savannah-email]<br>

[savannah-email]: mailto:savonna.sou@gmail.com


#### Zechariah Dominguez:

[<img align="left" alt="ZechariahDominguez | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][zechariah-linkedin]

[zechariah-linkedin]: https://www.linkedin.com/in/zechariah-dominguez/

[<img align="left" alt="ZechariahDominguez | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][zechariah-email]<br>

[zechariah-email]: mailto:zechariahd@gmail.com


#### Pristine Shin:

[<img align="left" alt="PristineShin | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][pristine-linkedin]

[pristine-linkedin]: https://www.linkedin.com/in/pristine-shin/

[<img align="left" alt="ZechariahDominguez | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][pristine-email]<br>

[pristine-email]: mailto:shin.pristine@gmail.com


#### Tiffany Tseng:

[<img align="left" alt="TiffanyTseng | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][tiffany-linkedin]

[tiffany-linkedin]: https://www.linkedin.com/in/ittseng/

[<img align="left" alt="TiffanyTseng | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][tiffany-email]<br>

[tiffany-email]: mailto:tifny7574@gmail.com


## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

# Feature List
   1. Users
   2. Products
   3. Reviews
   4. Cart
   5. Wishlist

## Future Features

### Search Functionality
* Users can search for products or sellers using keywords and view relevant search results.

### Play Music
* Users can preview music tracks before deciding whether to purchase.

### Preview Image
* Add preview image when editing or adding a new product.

### Create Fan Users
* Create fan users that have different permission than artist users.

### Payment Methods
* Allowing the ability to pay with credit card information, linking product purchases with banking information

# EndPoints

## Users

### User Login

Users can log in using their email or username.

- **Require authentication**: False
- **Request**

  - **Method**: POST
  - **Route path**: /api/auth/login
  - **Body**:
    ```json
    {
      "email_or_username": "user@example.com or username",
      "password": "your_password"
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "artistName": "exampleArtist",
      "username": "username",
      "email": "user@example.com",
      "bio": "example bio here",
      "profileImageUrl": "exampleprofile.url",
      "bannerImageUrl": "examplebanner.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27",
      "products": [productsList with their info],
    }
    ```

- **Error Response: Couldn't find user with given credentials**
  - **Status Code**: 404
  - **Body**:

```json
{
  "message": "Login failed. Please check your credentials and try again."
}
```

### User Logout

Users should be able to logout if they are currently logged in

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/auth/logout
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "User logged out"
    }
    ```

### User Signup

Users can create a new account by signing up.

- **Require authentication**: False
- **Request**

  - **Method**: POST
  - **Route path**: /api/auth/signup
  - **Body**:
    ```json
    {
      "artistname": "desired_artistName",
      "username": "desired_username",
      "email": "user@example.com",
      "password": "your_password",
      "confirm_password": "your_password"
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "id": 21,
      "artistName": "desired_artistName",
      "username": "desired_username",
      "email": "user@example.com",
      "bio": "",
      "profileImageUrl": "",
      "bannerImageUrl": "",
      "createdAt": "2024-11-01 02:12:32",
      "updatedAt": "2024-11-01 02:12:32",
      "products": []
    }
    ```

- **Error Response: User already exists**
  - **Status Code**: 409
  - **Body**:
    ```json
    {
      "message": "Username or email already exists."
    }
    ```

### User Delete

Users can delete their account.

- **Require authentication**: True
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/users/session
  - **Body**: None

- **Successful Response**

  - **Status Code**: 204
  - **Body**:
    ```json
    {
      "message": "User deleted successfully."
    }
    ```

- **Error Response: User is not authenticated**
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Get Current User

Users can retrieve their own user information.

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/users/session
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "current_username",
      "email": "current_user@example.com",
      "bio": "Current user's bio",
      "profileImageUrl": "currentprofile.url",
      "bannerImageUrl": "currentbanner.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27",
      "products": [products list here]
    }
    ```

- **Error Response: User is not logged in**
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Products

### Get all Products

Users should be able to view all Products.

- **Require authentication**: false
- **Request**
  - **Method**: GET
  - **Route path**: /api/products
  - **Body**: none
- **Successful Response**

  - **Status Code**: 200
  - **Body**:

    ```json
    {
      "products": [
        {
          "productId": 1,
          "name": "ProductName",
          "userId": 1,
          "type": "CD",
          "genre": "Rock",
          "price": 3,
          "description": "Description Here",
          "imageUrl": "image.url"
        }
        // more products...
      ]
    }
    ```

### Get details of a Product by id

Return details of a product specified by its id.

- **Require Authentication**: False
- **Request**

  - **Method**: GET
  - **Route path**: /api/products/:productId
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "productId": 1,
      "name": "ProductName",
      "userId": 1,
      "type": "CD",
      "genre": "Rock",
      "price": 3,
      "description": "Description Here",
      "imageUrl": "image.url",
      "createdAt": "2024-10-29 18:38:09.043894",
      "updatedAt": "2024-10-29 18:38:09.043894"
    }
    ```

- **Error Response**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product not found!"
    }
    ```

### Get current user's products

Return details of a product specified by its id.

- **Require Authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/products/current
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    [
      {
        "productId": 1,
        "name": "Adele - 30",
        "userId": 1,
        "type": "CD",
        "genre": "",
        "price": "14.99",
        "description": "Adele's highly anticipated album showcasing her powerful vocals and emotional lyrics.",
        "imageUrl": ".../seed-images/products/Adele-30(CD).jpg",
        "createdAt": "2024-10-30 23:51:27",
        "updatedAt": "2024-10-30 23:51:27"
      },
      {
        // more listed products
      }
    ]
    ```

- **Error Response**
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Get all Products by a user's Id

Return all products by specified user's id.

- **Require Authentication**: False
- **Request**

  - **Method**: GET
  - **Route path**: /api/products/:userId
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    [
      {
        "productId": 1,
        "name": "Adele - 30",
        "userId": 1,
        "type": "CD",
        "genre": "",
        "price": "14.99",
        "description": "Adele's highly anticipated album showcasing her powerful vocals and emotional lyrics.",
        "imageUrl": ".../seed-images/products/Adele-30(CD).jpg",
        "createdAt": "2024-10-30 23:51:27",
        "updatedAt": "2024-10-30 23:51:27"
      },
      {
        // more listed products
      }
    ]
    ```

- **Error Response - User not found**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Artist not found"
    }
    ```

### Create a Product

Users should be able to create a Product.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/products
  - **Body**:
    ```json
    {
      "name": "ProductName2",
      "userId": 2,
      "type": "CD",
      "genre": "Rock",
      "price": 4,
      "description": "Description here too",
      "imageUrl": "image.url"
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "product": {
        "productId": 2,
        "name": "ProductName2",
        "userId": 2,
        "type": "CD",
        "genre": "Rock",
        "price": 4,
        "description": "Description here too",
        "imageUrl": "image.url"
      }
    }
    ```

- **Error Response: Body Validation Errors**
  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "userId": "User is required",
        "type": "Type is required",
        "price": "Price must be a positive number",
        "description": "Description is required",
        "imageUrl": "Image is required"
      }
    }
    ```

### Update and Return existing Product

Users should be able to update their Product(s).

- **Require authentication**: True
- **Require proper Authentication: Product must belong to the user**
- **Request**

  - **Method**: Put
  - **Route path**: /api/products/:productId
  - **Body**:
    ```json
    {
      "name": "ProductName",
      "userId": 1,
      "type": "CD",
      "genre": "Rock",
      "price": 2,
      "description": "Updated description here",
      "imageUrl": "image.url"
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "product": {
        "productId": 1,
        "name": "ProductName",
        "userId": 1,
        "type": "CD",
        "genre": "Rock",
        "price": 2,
        "description": "Updated description here",
        "imageUrl": "image.url"
      }
    }
    ```

- **Error Response: Body Validation Errors**
  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "userId": "User is required",
        "type": "type is required",
        "price": "Price must be a positive number",
        "description": "Description is required",
        "imageUrl": "Image is required"
      }
    }
    ```
- **Error Response: Couldn't find a product by specified id**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product could not be found!"
    }
    ```

### Delete an existing product.

Users should be able to delete their Product(s).

- **Require authentication**: True
- **Require proper Authentication: Product must belong to the user**
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/products/:productId
  - **Body**: None

- **Successful Response**
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Product successfully deleted"
    }
    ```
- **Error Response: Couldn't find a product by specified id**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product not be found!"
    }
    ```

## Reviews

### Get all reviews by product's id

Users should be able to view all reviews on a Product.

- **Require authentication**: False
- **Request**
  - **Method**: GET
  - **Route path**: /api/products/:productId/reviews
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "reviews": [
        {
          "id": 1,
          "productId": 1,
          "userId": 1,
          "review": "Random comment"
        }
        // more reviews...
      ]
    }
    ```

- **Error Response: Couldn't find a product by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product could not be found!"
    }
    ```

### Create and return a review for a product by id

Users should be able to create a review for a Product.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/products/:productId/reviews
  - **Body**:
    ```json
    {
      "review": "Random comment"
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "review": {
        "id": 2,
        "productId": 1,
        "userId": 2,
        "review": "Random comment"
      }
    }
    ```

- **Error Response: Body Validation Errors**

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad **Request**",
      "errors": {
        "review": "Review is required"
      }
    }
    ```

- **Error Response: Couldn't find a product by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product could not be found"
    }
    ```

- **Error Response: Review from the current user already Exists for the Product**

  - **Status Code**: 500
  - **Body**:
    ```json
    {
      "message": "User already has a review for this product"
    }
    ```

### Update and return an existing review

Users should be able to update their review for a Product.

- **Require authentication**: True
- **Request**

  - **Method**: Put
  - **Route path**: /api/reviews/:reviewId
  - **Body**:
    ```json
    {
      "review": "Random updated comment"
    }
    ```

- **Successful Response**
  - **Status Code**: 200
  - **Body**:

```json
{
  "review": {
    "id": 2,
    "productId": 1,
    "userId": 2,
    "review": "Random updated comment"
  }
}
```

- **Error Response: Body Validation Errors**

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad **Request**",
      "errors": {
        "review": "Review is required"
      }
    }
    ```

- **Error Response: Couldn't find a product by specified id**

  - **Status Code**: 404
  - **Body**:

    ```json
    {
      "message": "Product could not be found!"
    }
    ```

  - **Error Response: Couldn't find a product by specified id**

  - **Status Code**: 403
  - **Body**:
    ```json
    {
      "message": "Requires proper authorization"
    }
    ```

### Delete an existing Review

Users should be able to delete their review from a Product.

- **Require authentication**: True
- **Request**
  - **Method**: DELETE
  - **Route path**: /api/reviews/:reviewId
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Review successfully deleted"
    }
    ```

- **Error Response: Couldn't find a review by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

## Shopping Cart

### View all products in the cart.

Users should be able to view all products added to their cart.

- **Require authentication**: True
- **Request**
  - **Method**: GET
  - **Route path**: /api/cart
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "cart": {
        "id": 1,
        "products": [
          {
            "productId": 1,
            "name": "ProductName",
            "quantity": 2,
            "price": 2
          }
          // more products in cart
        ]
      }
    }
    ```

- **Error Response: User not logged in**

  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Add product to shopping cart

Users should be able to add products to their shopping cart.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/cart
  - **Body**:
    ```json
    {
      "productId": 1,
      "quantity": 2
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Product has been added to cart",
      "cart": {
        "id": 1
        "products": [
          {
            "productId": 1,
            "name": "ProductName",
            "quantity": 2,
            "price": 2
          }
        ]
      }
    }
    ```

- **Error Response: Body Validation Errors**

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Product not found"
    }
    ```

### Remove product from shopping cart

Users should be able to remove products from their shopping cart.

- **Require authentication**: True
- **Request**
  - **Method**: DELETE
  - **Route path**: /api/cart/:productId
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Product removed from Cart"
    }
    ```

- **Error Response: Can't find product**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Can't find product in Cart"
    }
    ```

### Perform a "transaction"

Users should be able to perform a "transaction" to complete their purchase.

- **Require authentication**: True
- **Request**
  - **Method**: POST
  - **Route path**: /api/cart/checkout
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Your transaction of 19.98 was successful"
    }
    ```

- **Error Response**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Your cart is empty"
    }
    ```

## Wishlist

### View wishlist

Users should be able to view all of their wishlisted products.

- **Require authentication**: True
- **Request**
  - **Method**: GET
  - **Route path**: /api/wishlist
  - **Body**: None
- **Successful Response**
  - **Status Code**: 200
  - **Body**:

```json
{
  "wishlist": [
    {
      "productId": 1,
      "productName": "ProductName",
      "userId": 1,
      "price": 2
    },
    {
      "productId": 2,
      "name": "ProductName2",
      "userId": 1,
      "price": 4
    }
  ]
}
```

### Add product to Wishlist

Users should be able to wishlisted products.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/wishlist
  - **Body**:
    ```json
    {
      "productId": 1
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Product added to the wishlist"
      "wishlist": [
        {
          "productId": 1,
          "productName": "ProductName",
          "userId": 2,
          "price": 2
        }
      ]
    }
    ```

- **Error Response: Product already exists in wishlist**
  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Product is already in the wishlist"
    }
    ```

### Delete product from Wishlist

Users should be able to delete products from their Wishlist.

- **Request** Authentication: True
- **Request**
  - **Method**: DELETE
  - **Route path**: /api/wishlist/:productId
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Product removed from the wishlist"
    }
    ```

- **Error Response**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product not found in wishlist"
    }
    ```
