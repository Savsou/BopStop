# API Routes

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

  - **Method**: POST
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

- **Require authentication**: false
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
      "message": "Product couldn't be found"
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
      "message": "Successfully deleted product"
    }
    ```
- **Error Response: Couldn't find a product by specified id**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product couldn't be found"
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
      "message": "Product couldn't be found"
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
      "message": "Product couldn't be found"
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
      "message": "Product couldn't be found"
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
      "message": "Successfully deleted review"
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

- **Error Response: Can't find the cart**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Shopping Cart not found"
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
      "message": "Product added to the cart",
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
      "message": "Shopping Cart not found"
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
      "message": "Transaction successful"
    }
    ```

- **Error Response**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Shopping Cart couldn't be found"
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
