import { csrfFetch } from "./csrf.js";
import Cookies from 'js-cookie'

const LOAD_CART_ITEMS = '/api/cart/load_cart_items'
const LOAD_A_CART_ITEM = '/api/cart/load_a_cart_item'
const DELETE_CART_ITEM = '/api/cart/delete_cart_item'

export const loadCartItems = cart => (
  {
    type: LOAD_CART_ITEMS,
    cart
  }
)

export const loadACartItem = item => (
  {
    type: LOAD_A_CART_ITEM,
    item
  }
)

export const deleteCartItem = itemId => (
  {
    type: DELETE_CART_ITEM,
    itemId
  }
)

export const thunkGetCart = () => async dispatch =>{
  const res = await csrfFetch('/api/cart', {
    headers:{ "csrf_token": Cookies.get('csrf_token')},
    credentials: 'include'
  })
  const cart = await res.json()
  return {"return": cart}
  if (res.ok) {
    const cart = await res.json()
    if (cart.errors) return cart.errors
    dispatch(loadCartItems(cart))
  }
}

export const thunkAddItem = item => async dispatch =>{
  const res = await fetch('/api/cart',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(item)
    }
  )
  if (res.ok) {
    const addedMsg = await res.json();
    return addedMsg
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
  } else {
    return { "server": "Something went wrong. Please try again" }
}
}

export const thunkRemoveCartItem = itemId => async dispatch =>{
  const res = csrfFetch(`/api/cart/${itemId}`,
    {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
  )

  if (res.ok) {
    const deleted = await res.json();
    if (deleted.errors) return deleted.errors
    dispatch(deleteProduct(itemId))
  }
}

const initialState = {
  items: [],
  subTotal : 0
}

function cartReducer(state = initialState, action){
  switch(action.type){
    case(LOAD_CART_ITEMS):{
      const {cartDetails, subTotal} = action.cart
      return {
        ...state,
        items: cartDetails,
        subTotal: subTotal
      }
    }
    case(DELETE_CART_ITEM):{
      const {itemId} = action
      const copyState = { ...state }
      copyState.cartDetails.filter(item => itemId != item.productId)
      return copyState;
    }
    default:
      return state
  }
}


export default cartReducer
