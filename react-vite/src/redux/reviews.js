import { csrfFetch } from "./csrf";
import { createSelector } from 'reselect';

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

export const loadEditedReview = (reviewId, reviewText) => (
  {
    type: LOAD_EDITED_REVIEW,
    reviewId,
    reviewText
  }
)

export const deleteReview = reviewId => (
  {
    type:DELETE_REVIEW,
    reviewId
  }
)

//thunk action creators

export const thunkGetUserReviews = () => async dispatch => {
  const res = await csrfFetch('/api/reviews/current');
  if(res.ok){
    const userReviews = await res.json();
    dispatch(loadUserReviews(userReviews))
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
  } else {
    return { "server": "Something went wrong. Please try again" }
  }
}

export const thunkRemoveReview = reviewId => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {'Content-Type':'application/json'}
  })

  if(res.ok){
    dispatch(deleteReview(reviewId))
    // return await res.json() //If you want the delete message for frontend
  } else if (res.status < 500) {
    const errorMessages = await res.json();
    console.error("Validation Errors:", errorMessages);
    return errorMessages
  } else {
    return { "server": "Something went wrong. Please try again" }
  }

}

export const thunkEditReview = (reviewId, reviewText) => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`,
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ review: reviewText })
    }
  )
  if(res.ok){
    const editReview = await res.json();
    dispatch(loadEditedReview(editReview))
    return editReview
  }else if (res.status < 500) {
    const errorMessages = await res.json();
    return errorMessages
  } else {
    return { "server": "Something went wrong. Please try again" }
  }
}

//selectors
const selectReview = state => state.reviews
export const selectUserReviews = createSelector(selectReview, reviews => reviews.userReviews);
export const selectEditedReview = createSelector(selectReview, reviews => reviews.userReviews.reviewId)

const initialState = {userReviews:{}}

const reviewReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_USER_REVIEWS: {
      const userReviews = {}
      console.log(action)
      if(action.reviews){
        const reviews = action.reviews
        reviews.forEach(review=> {
          userReviews[review.id] = review
        })
        return {...state, userReviews}
      }
      return state
    }
    case LOAD_EDITED_REVIEW: {
      const reviewId = action.reviewId
      const reviewText = action.reviewText
      return {
        ...state,
        userReviews: {
          ...state.userReviews,
          [reviewId]: reviewText
          // {
          //   ...state[reviewId],
          //   review: reviewText
          // }
        }
      }
    }
    case DELETE_REVIEW:{
        const {reviewId} = action;
        const copyState = {...state }
        delete copyState.userReviews[reviewId]
        return copyState;
    }
    default:
      return state;
  }
}


export default reviewReducer;
