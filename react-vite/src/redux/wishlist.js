const LOAD_WISHLIST = '/api/cart/load_wishlist'
const LOAD_A_WISHLIST_ITEM = '/api/cart/load_a_wishlist_item'
const DELETE_WISHLIST_ITEM = '/api/cart/delete_wishlist_item'

const loadWishlist = wishlist => (
  {
    type: LOAD_WISHLIST,
    wishlist
  }
)

const loadAWishlistItem = item => (
  {
    type: LOAD_A_WISHLIST_ITEM,
    item
  }
)

const deleteWishlistItem = itemId => (
  {
    type: DELETE_WISHLIST_ITEM,
    itemId
  }
)

export const thunkGetWishlist = () => async dispatch => {
  try{
    const res = await fetch('/api/wishlist/session')
    if(res.ok){
      const wishlist = await res.json()
      dispatch(loadWishlist(wishlist))
    }else if (res.status < 500) {
      const errorMessages = await res.json();
      return errorMessages
    }
  }
  catch(e){
    console.error(e)
    return { "server": "Something went wrong. Please try again" }
  }
}

export const thunkAddWishlistItem = item => async dispatch =>{
  try{
    const res = await fetch('/api/wishlist/session',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
      }
    )
    if (res.ok) {
      const addedMsg = await res.json();
      dispatch(loadAWishlistItem(item))
      return addedMsg
    }else if (res.status < 500) {
      const errorMessages = await res.json();
      return errorMessages
    }
  }catch(e){
    console.error(e)
    return { "server": "Something went wrong. Please try again" }
  }
}

export const thunkRemoveWishlistItem = itemId => async dispatch =>{
  const res = await fetch(`/api/wishlist/${itemId}`,
    {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'}
    }
  )


  const deleted = await res.json();
  if (deleted.errors) return deleted.errors
  dispatch(deleteWishlistItem(itemId))
  return deleted
}

const initialState = {
  items: {},
  amount: 0
}

function wishlistReducer(state = initialState, action){
  switch(action.type){
    case(LOAD_WISHLIST):{
      const {wishlist} = action.wishlist
      if(wishlist.len <= 0) return state
      const wishlistItems = {}
      wishlist.forEach(item => allItems[item.productId] = item)
      return {
        items: wishlistItems,
        amount: wishlist.length
      }
    }

    case(LOAD_A_WISHLIST_ITEM):{
      const {item} = action
      return {
        ...state,
        items:{
          ...state.items,
          [item.productId]: item
        },
        amount: state.amount++
      }
    }

    case(DELETE_WISHLIST_ITEM): {
      const {itemId} = action
      const copyState = { ...state }
      copyState.items[itemId]
      return copyState
    }

    default:
      return state
  }
}

export default wishlistReducer