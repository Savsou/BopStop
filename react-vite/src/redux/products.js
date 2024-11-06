import { csrfFetch } from "./csrf.js";
import { createSelector } from 'reselect';

const LOAD_ALL_PRODUCTS = 'products/LOAD_ALL_PRODUCTS';
const LOAD_LIMITED_PRODUCTS = 'products/LOAD_LIMITED_PRODUCTS';
const LOAD_CURRENT_USER_PRODUCTS = 'products/LOAD_CURRENT_USER_PRODUCTS';
const LOAD_PRODUCT_BY_ID = 'products/LOAD_PRODUCT_BY_ID';
const LOAD_PRODUCT_REVIEWS = 'products/LOAD_PRODUCT_REVIEWS';
const CREATE_PRODUCT = 'products/CREATE_PRODUCT';
const CREATE_PRODUCT_REVIEW = 'products/CREATE_PRODUCT_REVIEW';
const DELETE_PRODUCT = 'products/DELETE_PRODUCT';
// const LOAD_ALL_PRODUCTS_REQUEST = 'products/LOAD_ALL_PRODUCTS_REQUEST';
// const LOAD_LIMITED_PRODUCTS_REQUEST = 'products/OAD_LIMITED_PRODUCTS_REQUEST';

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

export const getAllProducts = () => async dispatch => {
    // dispatch(loadAllProductsReq())

    const res = await csrfFetch('/api/products');
    if(res.ok){
      const products = res.json()
      if(products.errors) return products.errors
      dispatch(loadAllProducts(products["products"]))
    }
}

export const getLimitedProducts = () => async dispatch => {
   // dispatch(loadLimitedProductsReq())

  const res = await csrfFetch('/api/products/limited');
  if(res.ok){
    const products = res.json()
    if(products.errors) return products.errors
    dispatch(loadLimitedProducts(products["products"]))
  }
}

export const getCurrentUserProducts = () => async dispatch => {
  const res = await csrfFetch('/api/products/current');
  if(res.ok){
    const products = res.json()
    if(products.errors) return products.errors
    dispatch(loadCurrentUserProducts(products["products"]))
  }
}

export const getProductById = productId => async dispatch => {
  const res = await csrfFetch(`/api/products/${productId}`);
  if(res.ok){
    const product = res.json()
    if(product.errors) return product.errors
    dispatch(loadProductById(product))
  }
}

export const getProductReviews = productId => async dispatch => {
  const res = await csrfFetch(`/api/products/${productId}/reviews`);
  if(res.ok){
    const  reviews = res.json()
    if(reviews.errors) return reviews.errors
    dispatch(loadProductReviews(reviews['reviews']))
  }
}

export const addAProduct = product => async dispatch => {
  const res = await csrfFetch('/api/products', {
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

export const addAProductReview = (productId, review) => async dispatch => {
  const res = await csrfFetch(`/api/prodducts/${productId}/reviews`,{
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

export const removeProduct = productId => async dispatch => {
  const res = await csrfFetch(`/api/products/${productId}`,
    {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
  )

  if(res.ok){
    const deleted = await res.json();
    if(deleted.errors) return deleted.errors
    dispatch(deleteSpot(productId))
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
