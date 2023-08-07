import {
  LOAD_PRODUCTS as LOAD,
  LOAD_PRODUCT as LOAD_ONE,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS as LOAD_BY_RECOMMENDATIONS,
  LOAD_PRODUCTS_BY_RELATIONS as LOAD_BY_RELATIONS,
  LOAD_PRODUCTS_BY_SALE as LOAD_BY_SALE,
  LOAD_PRODUCTS_BY_SEARCH as LOAD_BY_SEARCH,
  CREATE_PRODUCT as CREATE,
  UPDATE_PRODUCT as UPDATE,
  DELETE_PRODUCT as DELETE,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../consts";
import { TokenType } from "./common";

export interface IProduct {
  title: string,
  slug: string,
  subcategoryId: string,
  brand: {
    id: string,
    title: string
  },
  description: string,
  images: string[],
  price: number,
  rating: {
    overall: number,
    reviewsCounr: number
  },
  specification: Array<{
    title: string,
    description: string
  }>,
  sale: {
    images: string[],
    price: number,
    title: string,
    subtitle: string,
    bgColor: string
  }
}

interface IProductsByCriterion {
  entities: { [key: string]: IProduct },
  loading: boolean,
  loaded: boolean,
  error: null | string[]
}

export interface IProductsState {
  common: Omit<IProductsByCriterion, 'loaded'> & {
    totalCount: number,
    minPrice: number,
    maxPrice: number,
    processing: boolean
  },
  byRecommendations: IProductsByCriterion,
  byRelations: IProductsByCriterion,
  bySale: IProductsByCriterion,
  bySearch: Omit<IProductsByCriterion, 'loaded'>,
}

export enum productsActions {
  LOAD_PRODUCTS = LOAD,
  LOAD_PRODUCTS_REQUEST = LOAD + REQUEST,
  LOAD_PRODUCTS_SUCCESS = LOAD + SUCCESS,
  LOAD_PRODUCTS_FAILURE = LOAD + FAILURE,
  LOAD_PRODUCT = LOAD_ONE,
  LOAD_PRODUCT_REQUEST = LOAD_ONE + REQUEST,
  LOAD_PRODUCT_SUCCESS = LOAD_ONE + SUCCESS,
  LOAD_PRODUCT_FAILURE = LOAD_ONE + FAILURE,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS = LOAD_BY_RECOMMENDATIONS,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS_REQUEST = LOAD_BY_RECOMMENDATIONS + REQUEST,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS_SUCCESS = LOAD_BY_RECOMMENDATIONS + SUCCESS,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS_FAILURE = LOAD_BY_RECOMMENDATIONS + FAILURE,
  LOAD_PRODUCTS_BY_RELATIONS = LOAD_BY_RELATIONS,
  LOAD_PRODUCTS_BY_RELATIONS_REQUEST = LOAD_BY_RELATIONS + REQUEST,
  LOAD_PRODUCTS_BY_RELATIONS_SUCCESS = LOAD_BY_RELATIONS + SUCCESS,
  LOAD_PRODUCTS_BY_RELATIONS_FAILURE = LOAD_BY_RELATIONS + FAILURE,
  LOAD_PRODUCTS_BY_SALE = LOAD_BY_SALE,
  LOAD_PRODUCTS_BY_SALE_REQUEST = LOAD_BY_SALE + REQUEST,
  LOAD_PRODUCTS_BY_SALE_SUCCESS = LOAD_BY_SALE + SUCCESS,
  LOAD_PRODUCTS_BY_SALE_FAILURE = LOAD_BY_SALE + FAILURE,
  LOAD_PRODUCTS_BY_SEARCH = LOAD_BY_SEARCH,
  LOAD_PRODUCTS_BY_SEARCH_REQUEST = LOAD_BY_SEARCH + REQUEST,
  LOAD_PRODUCTS_BY_SEARCH_SUCCESS = LOAD_BY_SEARCH + SUCCESS,
  LOAD_PRODUCTS_BY_SEARCH_FAILURE = LOAD_BY_SEARCH + FAILURE,
  CREATE_PRODUCT = CREATE,
  CREATE_PRODUCT_REQUEST = CREATE + REQUEST,
  CREATE_PRODUCT_SUCCESS = CREATE + SUCCESS,
  CREATE_PRODUCT_FAILURE = CREATE + FAILURE,
  UPDATE_PRODUCT = UPDATE,
  UPDATE_PRODUCT_REQUEST = UPDATE + REQUEST,
  UPDATE_PRODUCT_SUCCESS = UPDATE + SUCCESS,
  UPDATE_PRODUCT_FAILURE = UPDATE + FAILURE,
  DELETE_PRODUCT = DELETE,
  DELETE_PRODUCT_REQUEST = DELETE + REQUEST,
  DELETE_PRODUCT_SUCCESS = DELETE + SUCCESS,
  DELETE_PRODUCT_FAILURE = DELETE + FAILURE
}

interface ILoadProductsAction {
  type: productsActions.LOAD_PRODUCTS,
  CallApi: string,
  subcategoryId?: string
}

interface ILoadProductsRequestAction {
  type: productsActions.LOAD_PRODUCTS_REQUEST
}

interface ILoadProductsSuccessAction {
  type: productsActions.LOAD_PRODUCTS_SUCCESS,
  data: {
    products: {
      entities: IProduct[],
      totalCount: 4,
      minPrice: number,
      maxPrice: number
    }
  }
}

interface ILoadProductsFailureAction {
  type: productsActions.LOAD_PRODUCTS_FAILURE,
  error: { error: { [key: string]: string } }
}



interface ILoadProductAction {
  type: productsActions.LOAD_PRODUCT,
  CallApi: string,
  id: string
}

interface ILoadProductRequestAction {
  type: productsActions.LOAD_PRODUCT_REQUEST
}

interface ILoadProductSuccessAction {
  type: productsActions.LOAD_PRODUCT_SUCCESS,
  data: { product: IProduct },
  id: string
}

interface ILoadProductFailureAction {
  type: productsActions.LOAD_PRODUCT_FAILURE,
  error: { error: { [key: string]: string } }
}



interface ILoadProductsByRecommendationsAction {
  type: productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS,
  CallApi: string
}

interface ILoadProductsByRecommendationsRequestAction {
  type: productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS_REQUEST
}

interface ILoadProductsByRecommendationsSuccessAction {
  type: productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS_SUCCESS,
  data: { recommendations: IProduct[] }
}

interface ILoadProductsByRecommendationsFailureAction {
  type: productsActions.LOAD_PRODUCTS_BY_RECOMMENDATIONS_FAILURE,
  error: { error: { [key: string]: string } }
}



interface ILoadProductsByRelationsAction {
  type: productsActions.LOAD_PRODUCTS_BY_RELATIONS,
  CallApi: string
}

interface ILoadProductsByRelationsRequestAction {
  type: productsActions.LOAD_PRODUCTS_BY_RELATIONS_REQUEST
}

interface ILoadProductsByRelationsSuccessAction {
  type: productsActions.LOAD_PRODUCTS_BY_RELATIONS_SUCCESS,
  data: { relations: IProduct[] }
}

interface ILoadProductsByRelationsFailureAction {
  type: productsActions.LOAD_PRODUCTS_BY_RELATIONS_FAILURE,
  error: { error: { [key: string]: string } }
}



interface ILoadProductsBySaleAction {
  type: productsActions.LOAD_PRODUCTS_BY_SALE,
  CallApi: string
}

interface ILoadProductsBySaleRequestAction {
  type: productsActions.LOAD_PRODUCTS_BY_SALE_REQUEST
}

interface ILoadProductsBySaleSuccessAction {
  type: productsActions.LOAD_PRODUCTS_BY_SALE_SUCCESS,
  data: { sale: IProduct[] }
}

interface ILoadProductsBySaleFailureAction {
  type: productsActions.LOAD_PRODUCTS_BY_SALE_FAILURE,
  error: { error: { [key: string]: string } }
}



interface ILoadProductsBySearchAction {
  type: productsActions.LOAD_PRODUCTS_BY_SEARCH,
  CallApi: string
}

interface ILoadProductsBySearchRequestAction {
  type: productsActions.LOAD_PRODUCTS_BY_SEARCH_REQUEST
}

interface ILoadProductsBySearchSuccessAction {
  type: productsActions.LOAD_PRODUCTS_BY_SEARCH_SUCCESS,
  data: { search: IProduct[] }
}

interface ILoadProductsBySearchFailureAction {
  type: productsActions.LOAD_PRODUCTS_BY_SEARCH_FAILURE,
  error: { error: { [key: string]: string } }
}



interface ICreateProductAction {
  type: productsActions.CREATE_PRODUCT,
  CallApi: string,
  id: string,
  values: object,
  token: TokenType
}

interface ICreateProductRequestAction {
  type: productsActions.CREATE_PRODUCT_REQUEST
}

interface ICreateProductSuccessAction {
  type: productsActions.CREATE_PRODUCT_SUCCESS,
  data: { product: IProduct },
  id: string
}

interface ICreateProductFailureAction {
  type: productsActions.CREATE_PRODUCT_FAILURE,
  error: { error: { [key: string]: string } }
}



interface IUpdateProductAction {
  type: productsActions.UPDATE_PRODUCT,
  CallApi: string,
  id: string,
  values: object,
  token: TokenType,
  method: string
}

interface IUpdateProductRequestAction {
  type: productsActions.UPDATE_PRODUCT_REQUEST
}

interface IUpdateProductSuccessAction {
  type: productsActions.UPDATE_PRODUCT_SUCCESS,
  data: { product: IProduct },
  id: string
}

interface IUpdateProductFailureAction {
  type: productsActions.UPDATE_PRODUCT_FAILURE,
  error: { error: { [key: string]: string } }
}



interface IDeleteProductAction {
  type: productsActions.DELETE_PRODUCT,
  CallApi: string,
  id: string,
  token: TokenType,
  method: string
}

interface IDeleteProductRequestAction {
  type: productsActions.DELETE_PRODUCT_REQUEST
}

interface IDeleteProductSuccessAction {
  type: productsActions.DELETE_PRODUCT_SUCCESS,
  data: { product: IProduct },
  id: string
}

interface IDeleteProductFailureAction {
  type: productsActions.DELETE_PRODUCT_FAILURE,
  error: { error: { [key: string]: string } }
}



export type productsActionType =
  ILoadProductsAction
  | ILoadProductsRequestAction
  | ILoadProductsSuccessAction
  | ILoadProductsFailureAction
  | ILoadProductAction
  | ILoadProductRequestAction
  | ILoadProductSuccessAction
  | ILoadProductFailureAction
  | ILoadProductsByRecommendationsAction
  | ILoadProductsByRecommendationsRequestAction
  | ILoadProductsByRecommendationsSuccessAction
  | ILoadProductsByRecommendationsFailureAction
  | ILoadProductsByRelationsAction
  | ILoadProductsByRelationsRequestAction
  | ILoadProductsByRelationsSuccessAction
  | ILoadProductsByRelationsFailureAction
  | ILoadProductsBySaleAction
  | ILoadProductsBySaleRequestAction
  | ILoadProductsBySaleSuccessAction
  | ILoadProductsBySaleFailureAction
  | ILoadProductsBySearchAction
  | ILoadProductsBySearchRequestAction
  | ILoadProductsBySearchSuccessAction
  | ILoadProductsBySearchFailureAction
  | ICreateProductAction
  | ICreateProductRequestAction
  | ICreateProductSuccessAction
  | ICreateProductFailureAction
  | IUpdateProductAction
  | IUpdateProductRequestAction
  | IUpdateProductSuccessAction
  | IUpdateProductFailureAction
  | IDeleteProductAction
  | IDeleteProductRequestAction
  | IDeleteProductSuccessAction
  | IDeleteProductFailureAction
