import {
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_REVIEW as ADD
} from "../redux/consts";

interface IReview {
  id: string,
  productId: string,
  title: string,
  name: string,
  text: string,
  recommended: boolean,
  rating: number,
  date: string,
}

export interface IReviewsState {
  [key: string]: {
    entities: IReview[],
    loading: boolean,
    loaded: boolean,
    error: null | string[]
  }
}

export enum reviewsActions {
  LOAD_REVIEWS_REQUEST = LOAD_REVIEWS + REQUEST,
  LOAD_REVIEWS_SUCCESS = LOAD_REVIEWS + SUCCESS,
  LOAD_REVIEWS_FAILURE = LOAD_REVIEWS + FAILURE,
  ADD_REVIEW = ADD
}

interface ILoadReviewsRequestAction {
  type: reviewsActions.LOAD_REVIEWS_REQUEST
  productId: string,
}

interface ILoadReviewsSuccesstAction {
  type: reviewsActions.LOAD_REVIEWS_SUCCESS,
  productId: string,
  data: { reviews: IReview[] },
}

interface ILoadReviewsFailuretAction {
  type: reviewsActions.LOAD_REVIEWS_FAILURE,
  productId: string,
  error: { error: { [key: string]: string } }
}

interface IAddReviewAction {
  type: reviewsActions.ADD_REVIEW,
  productId: string,
  values: IReview
}

export type reviewsActionType =
  ILoadReviewsRequestAction
  | ILoadReviewsSuccesstAction
  | ILoadReviewsFailuretAction
  | IAddReviewAction