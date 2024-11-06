# Redux State Schema
```json
{
  users: {
    1: {
      id: 1,
      artistName: "DemoName",
      username: "Demo",
      email: "demo@aa.io",
      bio: "some bio",
      profileImageUrl: "image.jpeg",
      bannerImageUrl: "banner.jpeg"
    },
    2: {
      id: 2,
      artistName: "DemoNumba2",
      username: "Demo2",
      email: "demo2@aa.io",
      bio: "another bio",
      profileImageUrl: "image2.jpeg",
      bannerImageUrl: "banner2.jpeg"
    },
  },
  products: {
    allProducts:[
      1:{
        id: 1,
        userId: 2,
        name: "Product A",
        type: "Vinyl",
        genre: "",
        description: "Description of Product A",
        price: 7.99,
        imageUrl: "productA.jpeg",
        reviews_ids: [1, 2],
        // in_cart: true
        // in_wishlist: false
      },
      2: {
        id: 2,
        userId: 2,
        name: "Product B",
        description: "Description of Product B",
        type: "CD",
        genre: "",
        price: 9.99,
        imageUrl: "productB.jpeg",
        reviews_ids: [3],
        // in_cart: true
        // in_wishlist: false
        }
      ],

    limitedProducts:[
      1:{
        id: 1,
        userId: 2,
        name: "Product A",
        type: "Vinyl",
        genre: "",
        description: "Description of Product A",
        price: 7.99,
        imageUrl: "productA.jpeg",
        reviews_ids: [1, 2],
        // in_cart: true
        // in_wishlist: false
      },
      2: {
        id: 2,
        userId: 2,
        name: "Product B",
        description: "Description of Product B",
        type: "CD",
        genre: "",
        price: 9.99,
        imageUrl: "productB.jpeg",
        reviews_ids: [3],
        // in_cart: true
        // in_wishlist: false
      }
    ]
  },
  reviews: {
    1: {
      id: 1,
      user_id: 1,
      product_id: 1,
      review: "It really is a Bop!"
    },
    2: {
      id: 2,
      user_id: 1,
      product_id: 2,
      review: "Song of the Year!"
    },
  },
  cart: {
    items: [
      {
        product_id: 1,
        quantity: 2
      },
      {
        product_id: 2,
        quantity: 1
      }
    ],
    total_price: 27.97
  },
  wishlist: {
    items: [
      {
        product_id: 2,
        created_At: "2024-11-01"
      }
    ]
  },
  session: {
    user: {
      id: 1,
      name: 'Demo'
    }
  },
}
