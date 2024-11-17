import { createSelector } from 'reselect';
import { deleteProductReview} from './products'

const LOAD_USER_REVIEWS = 'reviews/load_user_reviews';
const LOAD_EDITED_REVIEW = 'reviews/load_edited_review';
const DELETE_REVIEW = 'reviews/delete_user_reviews';

//action creators
export const loadUserReviews = reviews => (
  {
    type: LOAD_USER_REVIEWS,
    reviews
  }
)

export const loadEditedReview = (review) => (
  {
    type: LOAD_EDITED_REVIEW,
    review
  }
)

export const deleteReview = reviewId => (
  {
    type: DELETE_REVIEW,
    reviewId
  }
)

//thunk action creators

export const thunkGetUserReviews = () => async dispatch => {
  try {
    const res = await fetch('/api/reviews/current');
    if (res.ok) {
      const userReviews = await res.json();
      dispatch(loadUserReviews(userReviews))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      return errorMessages
    }
  } catch (e) {
    console.error("Error in thunkGetUserReviews:", e);
    return { server: "Something went wrong. Please try again" }
  }
}

export const thunkRemoveReview = (reviewId, productId) => async dispatch => {
  try {
    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      dispatch(deleteReview(reviewId))
      dispatch(thunkGetUserReviews())
      dispatch(deleteProductReview({reviewId, productId}))
      // return await res.json() //If you want the delete message for frontend
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      return errorMessages
    }
  } catch (e) {
    console.error("Error in thunkRemoveReview:", e);
    return { server: "Something went wrong. Please try again" }
  }
}

export const thunkEditReview = (reviewId, reviewText) => async dispatch => {
  try {
    const res = await fetch(`/api/reviews/${reviewId}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewText)
      }
    )
    if (res.ok) {
      const editReview = await res.json();
      dispatch(loadEditedReview(editReview))
      return editReview
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      return errorMessages
    }
  } catch (e) {
    console.error("Error in thunkEditReview:", e);
    return { server: "Something went wrong. Please try again" }
  }

}

//selectors
const selectReview = state => state.reviews
export const selectUserReviews = createSelector(selectReview, reviews => reviews.userReviews);

const initialState = { userReviews: {} }

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_REVIEWS: {
      const userReviews = {}
      if (action.reviews) {
        const reviews = action.reviews
        reviews.forEach(review => {
          userReviews[review.id] = review
        })
        return { ...state, userReviews }
      }
      return state
    }
    case LOAD_EDITED_REVIEW: {
      const { review } = action.review
      return {
        ...state,
        userReviews: {
          ...state.userReviews,
          [review.id]: review
        }
      }
    }
    case DELETE_REVIEW: {
      const { reviewId } = action;
      const copyState = { ...state }
      delete copyState.userReviews[reviewId]
      return copyState;
    }
    default:
      return state;
  }
}


export default reviewReducer;
