import produce from "immer";
import {
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_REVIEW
} from "../consts";

const storageReviews = JSON.parse(localStorage.getItem('addedReviews')) || {};

export default (state = {}, action) =>
  produce(state, draft => {
    const {type, productId, overallRating, reviewsCount, values, data, error} = action;

    switch (type) {
      case LOAD_REVIEWS + REQUEST:
        draft[productId] = {};
        draft[productId].loading = true;
        draft[productId].loaded = false;
        draft[productId].error = null;
        break;

      case LOAD_REVIEWS + SUCCESS:
        draft[productId].loading = false;
        draft[productId].loaded = true;
        draft[productId].entities = storageReviews?.[productId] ? [].concat(storageReviews[productId].entitie, data.reviews) : data.reviews;
        // draft[productId].entities = data.reviews;
        break;

      case LOAD_REVIEWS + FAILURE:
        draft[productId].loading = false;
        draft[productId].loaded = false;
        draft[productId].error = error;
        break;

      case ADD_REVIEW:
        storageReviews[productId] = {};
        const currentStorageReview = storageReviews[productId];

        currentStorageReview.entitie = values;
        currentStorageReview.overallRating = overallRating;
        currentStorageReview.reviewsCount = reviewsCount;

        localStorage.setItem('addedReviews', JSON.stringify(storageReviews));

        draft[productId].entities.unshift(values);
        break;

      default:
        return;
    }
  });


