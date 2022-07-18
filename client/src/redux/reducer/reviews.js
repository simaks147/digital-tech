import produce from "immer";
import {
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_REVIEW
} from "../consts";

// const addedReview = localStorage.getItem('addedReview');

export default (state = {}, action) =>
  produce(state, draft => {
    const {type, productId, values, data, error} = action;

    switch (type) {
      case LOAD_REVIEWS + REQUEST:
        draft[productId] = {};
        draft[productId].loading = true;
        draft[productId].loaded = false;
        draft[productId].error = null;
        break;

      case LOAD_REVIEWS + SUCCESS:
        // data.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

        draft[productId].loading = false;
        draft[productId].loaded = true;
        // draft[productId].entities = addedReview ? [].concat(JSON.parse(addedReview), data.reviews) : data.reviews;
        draft[productId].entities = data.reviews;
        break;

      case LOAD_REVIEWS + FAILURE:
        draft[productId].loading = false;
        draft[productId].loaded = false;
        draft[productId].error = error;
        break;

      case ADD_REVIEW:
        // localStorage.setItem('addedReview', JSON.stringify(values));
        draft[productId].entities.unshift(values);
        break;

      default:
        return;
    }
  });


