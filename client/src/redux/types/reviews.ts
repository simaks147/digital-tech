import {
  LOAD_REVIEWS as LOAD,
  REQUEST,
  SUCCESS,
  FAILURE,
  ADD_REVIEW as ADD
} from "../consts";

export interface IReview {
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
  LOAD_REVIEWS = LOAD,
  LOAD_REVIEWS_REQUEST = LOAD + REQUEST,
  LOAD_REVIEWS_SUCCESS = LOAD + SUCCESS,
  LOAD_REVIEWS_FAILURE = LOAD + FAILURE,
  ADD_REVIEW = ADD
}

interface ILoadReviewsAction {
  type: reviewsActions.LOAD_REVIEWS,
  CallApi: string,
  productId: string,
}

interface ILoadReviewsRequestAction {
  type: reviewsActions.LOAD_REVIEWS_REQUEST,
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
  ILoadReviewsAction
  | ILoadReviewsRequestAction
  | ILoadReviewsSuccesstAction
  | ILoadReviewsFailuretAction
  | IAddReviewAction