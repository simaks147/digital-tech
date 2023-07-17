import {
    LOAD_REVIEWS,
    REQUEST,
    SUCCESS,
    FAILURE,
    ADD_REVIEW as ADD
} from "../redux/consts";

interface IReviewType {
    id: string,
    productId: string,
    title: string,
    name: string,
    text: string,
    recommended: boolean,
    rating: number,
    date: string,
}

export interface IReviewsStateType {
    [key: string]: {
        entities: IReviewType[],
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

interface ILoadReviewsRequestActionType {
    type: reviewsActions.LOAD_REVIEWS_REQUEST
    productId: string,
}

interface ILoadReviewsSuccesstActionType {
    type: reviewsActions.LOAD_REVIEWS_SUCCESS,
    productId: string,
    data: { reviews: IReviewType[] },
}

interface ILoadReviewsFailuretActionType {
    type: reviewsActions.LOAD_REVIEWS_FAILURE,
    productId: string,
    error: { error: { [key: string]: string } }
}

interface IAddReviewActionType {
    type: reviewsActions.ADD_REVIEW,
    productId: string,
    values: IReviewType
}

export type reviewsActionType = ILoadReviewsRequestActionType
    | ILoadReviewsSuccesstActionType
    | ILoadReviewsFailuretActionType
    | IAddReviewActionType