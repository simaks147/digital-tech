import produce from "immer";
import { objToArr } from "../utils";
import { IReviewsState, reviewsActionType, reviewsActions } from "../../types/reviews";

const storageReviews = JSON.parse(localStorage.getItem('addedReviews') || '{}');

export default (state: IReviewsState = {}, action: reviewsActionType): IReviewsState =>
  produce(state, draft => {
    switch (action.type) {
      case reviewsActions.LOAD_REVIEWS_REQUEST:
        draft[action.productId] = {
          entities: [],
          loading: true,
          loaded: false,
          error: null,
        };
        break;

      case reviewsActions.LOAD_REVIEWS_SUCCESS:
        draft[action.productId].loading = false;
        draft[action.productId].loaded = true;
        draft[action.productId].entities = storageReviews?.[action.productId]
          ? [storageReviews[action.productId].entitie, ...action.data.reviews]
          : action.data.reviews;
        break;

      case reviewsActions.LOAD_REVIEWS_FAILURE:
        draft[action.productId].loading = false;
        draft[action.productId].loaded = false;
        draft[action.productId].error = objToArr(action.error.error);
        break;

      case reviewsActions.ADD_REVIEW:
        storageReviews[action.productId] = {};
        storageReviews[action.productId].entitie = action.values;

        localStorage.setItem('addedReviews', JSON.stringify(storageReviews));

        draft[action.productId].entities.unshift(action.values);
        break;

      default:
        return;
    }
  });


