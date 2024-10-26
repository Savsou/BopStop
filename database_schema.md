# **Database Schema**

![bopstop-database-schema](Group-BandCamp.png)

## `users`

| column name     | data type | details               |
| --------------- | --------- | --------------------- |
| id              | integer   | not null, primary key |
| firstName       | string    | not null              |
| lastName        | string    | not null              |
| bio             | string    |                       |
| email           | string    | not null, unique      |
| username        | string    | not null, unique      |
| hashedPassword  | string    | not null, unique      |
| profileImageUrl | string    |                       |
| bannerImageUrl  | string    |                       |
| createdAt       | datetime  | not null              |
| updatedAt       | datetime  | not null              |

## `products`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| name        | string    | not null, unique      |
| userId      | integer   | not null, foreign key |
| type        | string    | not null              |
| price       | decimal   | not null              |
| description | string    | not null              |
| imageUrl    | string    | not null              |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

- `userId` references `users` table

## `reviews`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| review      | string    | not null              |
| productId   | integer   | not null, foreign key |
| userId      | integer   | not null, foreign key |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

- `userId` references `users` table
- `productId` references `products` table

## `wishlists`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

- `userId` references `users` table

## `wishlists_products` JOIN TABLE

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| productId   | integer   | not null, foreign key |
| wishlistId  | integer   | not null, foreign key |
| createdAt   | datetime  | not null              |

- `productId` references `products` table
- `wishlistId` references `wishlists` table

## `carts`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| subtotal    | decimal   | not null              |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

- `userId` references `users` table

## `carts_products` JOIN TABLE

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| cartId      | integer   | not null, foreign key |
| productId   | integer   | not null, foreign key |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

- `cartId` references `carts` table
- `productId` references `products` table
