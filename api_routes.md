# API Routes

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

- **Error Response: Body Validation Errorse**
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

- **Error Response: Body Validation Errorse**
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

- **Error Response: Body Validation Errorse**

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

- **Error Response: Couldn't find a product by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Product couldn't be found"
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
      "message": "Can't find product in cart"
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
