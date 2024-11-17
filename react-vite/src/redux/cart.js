import { thunkGetProductById } from "./products_pristine"

const LOAD_CART_ITEMS = '/api/cart/load_cart_items'
const LOAD_A_CART_ITEM = '/api/cart/load_a_cart_item'
const DELETE_CART_ITEM = '/api/cart/delete_cart_item'
const TRIGGER_WIGGLE = '/api/cart/trigger_wiggle';
const RESET_WIGGLE = '/api/cart/reset_wiggle';

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

export const triggerWiggle = () => ({
  type: TRIGGER_WIGGLE,
});

export const resetWiggle = () => ({
  type: RESET_WIGGLE,
});

export const thunkGetCart = () => async dispatch => {
  try {
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
  } catch (e) {
    console.error(e)
    return { server: "Something went wrong. Please try again" }
  }
}

export const thunkAddCartItem = productId => async dispatch => {
  try {
    const res = await fetch('/api/cart/session',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      }
    )
    if (res.ok) {
      const addedMsg = await res.json();
      const item = await dispatch(thunkGetProductById(productId))
      await dispatch(loadACartItem(item))
      dispatch(thunkGetCart())
      return addedMsg
    } else if (res.status < 500) {
      const errorMessages = await res.json();
      return errorMessages
    }
  } catch (e) {
    console.error(e)
    return { "server": "Something went wrong. Please try again" }
  }
}

export const thunkRemoveCartItem = itemId => async dispatch => {
  const res = await fetch(`/api/cart/${itemId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
  )
  const deleted = await res.json();
  if (deleted.errors) return deleted.errors
  await dispatch(deleteCartItem(itemId))
  dispatch(thunkGetCart())
  return deleted
}

const initialState = {
  items: {},
  subtotal: 0,
  wiggle: 0
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case (LOAD_CART_ITEMS): {
      const { cartDetails, subtotal } = action.cart
      if (cartDetails.length <= 0) return initialState
      const cartItems = {}
      cartDetails.forEach(item => cartItems[item.productId] = item)
      return {
        items: cartItems,
        subtotal
      }
    }

    case (LOAD_A_CART_ITEM): {
      const { item } = action
      return {
        ...state,
        items: {
          ...state.items,
          [item.productId]: item
        },
      }
    }

    case (DELETE_CART_ITEM): {
      const { itemId } = action
      const copyState = { ...state }

      delete copyState.items[itemId]
      return copyState;
    }
    case TRIGGER_WIGGLE: {
      return {
        ...state,
        wiggle: 1,
      };
    }

    case RESET_WIGGLE: {
      return {
        ...state,
        wiggle: 0,
      };
    }
    default:
      return state
  }
}

export default cartReducer
