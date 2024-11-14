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
  try{
    const res = await fetch('/api/cart/session')
    if (res.ok) {
      const cart = await res.json()
      dispatch(loadCartItems(cart))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      return errorMessages
    }
  }catch(e){
    console.error(e)
    return { server: "Something went wrong. Please try again" }
  }
}

export const thunkAddCartItem = item => async dispatch =>{
  try{
    const res = await fetch('/api/cart/session',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
      }
    )
    if (res.ok) {
      const addedMsg = await res.json();
      dispatch(loadACartItem(item))
      dispatch(thunkGetCart())
      return addedMsg
    } else if (res.status < 500) {
      const errorMessages = await res.json();
      return errorMessages
    }
  }catch(e){
    console.error(e)
    return { "server": "Something went wrong. Please try again" }
  }
}

export const thunkRemoveCartItem = itemId => async dispatch =>{
  const res = fetch(`/api/cart/${itemId}`,
    {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
  )
  const deleted = await res.json();
  if (deleted.errors) return deleted.errors
  dispatch(deleteProduct(itemId))
  return deleted
}

const initialState = {
  items: {},
  subtotal : 0
}

function cartReducer(state = initialState, action){
  switch(action.type){
    case(LOAD_CART_ITEMS):{
      const {cartDetails, subtotal} = action.cart
      if(cartDetails.len <= 0) return state
      const cartItems = {}
      cartDetails.forEach(item => cartItems[item.productId] = item)
      return {
        items: cartItems,
        subtotal
      }
    }

    case(LOAD_A_CART_ITEM):{
      const {item} = action
      return {
        ...state,
        items:{
          ...state.items,
          [item.productId]: item
        },
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
