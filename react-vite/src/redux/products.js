// import { createSelector } from 'reselect';

const LOAD_ALL_PRODUCTS = 'products/load_all_products';
const LOAD_LIMITED_PRODUCTS = 'products/load_limited_products';
const LOAD_CURRENT_USER_PRODUCTS = 'products/load_current_user_products';
const LOAD_PRODUCT_BY_ID = 'products/load_product_by_id';
const LOAD_PRODUCT_REVIEWS = 'products/load_product_reviews';
const CREATE_PRODUCT = 'products/create_product';
const CREATE_PRODUCT_REVIEW = 'products/create_product_review';
const DELETE_PRODUCT = 'products/delete_product';
// const LOAD_ALL_PRODUCTS_REQUEST = 'products/load_all_products_request';
// const LOAD_LIMITED_PRODUCTS_REQUEST = 'products/load_limited_products_request';

//action creators

export const loadAllProducts = products => (
  {
    type: LOAD_ALL_PRODUCTS,
    products
  }
)

export const loadLimitedProducts = products => (
  {
    type: LOAD_LIMITED_PRODUCTS,
    products
  }
)

// export const loadAllProductsReq = () => (
//   {
//     type: LOAD_ALL_PRODUCTS_REQUEST
//   }
// )

// export const loadLimitedProductsReq = () => (
//   {
//     type: LOAD_LIMITED_PRODUCTS_REQUEST
//   }
// )

export const loadCurrentUserProducts = products => (
  {
    type: LOAD_CURRENT_USER_PRODUCTS,
    products
  }
)

export const loadProductById = product => (
  {
    type: LOAD_PRODUCT_BY_ID,
    product
  }
)

export const loadProductReviews = reviews => (
  {
    type: LOAD_PRODUCT_REVIEWS,
    reviews
  }
)

export const createProduct = product => (
  {
    type: CREATE_PRODUCT,
    product
  }
)

export const createProductReview = review => (
  {
    type: CREATE_PRODUCT_REVIEW,
    review
  }
)

export const deleteProduct = productId => (
  {
    type: DELETE_PRODUCT,
    productId
  }
)

//thunk action creators

export const thunkGetAllProducts = () => async dispatch => {
    // dispatch(loadAllProductsReq())

    const res = await fetch('/api/products');
    if(res.ok){
      const products = res.json()
      if(products.errors) return products.errors
      dispatch(loadAllProducts(products["products"]))
    }
}

export const thunkGetLimitedProducts = () => async dispatch => {
   // dispatch(loadLimitedProductsReq())

  const res = await fetch('/api/products/limited');
  if(res.ok){
    const products = res.json()
    if(products.errors) return products.errors
    dispatch(loadLimitedProducts(products["products"]))
  }
}

export const thunkGetCurrentUserProducts = () => async dispatch => {
  const res = await fetch('/api/products/current');
  if(res.ok){
    const products = res.json()
    if(products.errors) return products.errors
    dispatch(loadCurrentUserProducts(products["products"]))
  }
}

export const thunkGetProductById = productId => async dispatch => {
  const res = await fetch(`/api/products/${productId}`);
  if(res.ok){
    const product = res.json()
    if(product.errors) return product.errors
    dispatch(loadProductById(product))
  }
}

export const thunkGetProductReviews = productId => async dispatch => {
  const res = await fetch(`/api/products/${productId}/reviews`);
  if(res.ok){
    const  reviews = res.json()
    if(reviews.errors) return reviews.errors
    dispatch(loadProductReviews(reviews['reviews']))
  }
}

export const thunkAddAProduct = product => async dispatch => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body : JSON.stringify(product)
  })
  if(res.ok){
    const newProduct = res.json()
    if(newProduct.errors) return newProduct.errors
    dispatch(createProduct(newProduct))
  }
}

export const thunkAddAProductReview = (productId, review) => async dispatch => {
  const res = await fetch(`/api/prodducts/${productId}/reviews`,{
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(review)
  })
  if(res.ok){
    const newReview = await res.json()
    if(newReview.errors) return newReview.errors
    dispatch(createProductReview(newReview))
  }
}

export const thunkRemoveProduct = productId => async dispatch => {
  const res = await fetch(`/api/products/${productId}`,
    {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
  )

  if(res.ok){
    const deleted = await res.json();
    if(deleted.errors) return deleted.errors
    dispatch(deleteProduct(productId))
  }
}

const initialState = {
  limitedProducts: [],
  allProducts: [],
  loading: false,
}

const productReducer = (state = initialState, action) => {
  switch(action.type){
    // case LOAD_ALL_PRODUCTS_REQUEST:
    // case LOAD_LIMITED_PRODUCTS_REQUEST:
    //   return {
    //     ...state,
    //     loading: true
    //   }
    case LOAD_ALL_PRODUCTS:
      return {
        ...state,
        loading: false,
        allProducts: action.products,
      };
    case LOAD_LIMITED_PRODUCTS:
      return {
        ...state,
        loading: false,
        limitedProducts: action.products
      }
    default:
      return state;
  }
}

export default productReducer;
