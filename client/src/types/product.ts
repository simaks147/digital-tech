import {
  LOAD_PRODUCTS,
  LOAD_PRODUCT,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS,
  LOAD_PRODUCTS_BY_RELATIONS,
  LOAD_PRODUCTS_BY_SALE,
  LOAD_PRODUCTS_BY_SEARCH,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  REQUEST,
  SUCCESS,
  FAILURE
} from "../redux/consts";

interface IProduct {
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
  LOAD_PRODUCTS_REQUEST = LOAD_PRODUCTS + REQUEST,
  LOAD_PRODUCTS_SUCCESS = LOAD_PRODUCTS + SUCCESS,
  LOAD_PRODUCTS_FAILURE = LOAD_PRODUCTS + FAILURE,
  LOAD_PRODUCT_REQUEST = LOAD_PRODUCT + REQUEST,
  LOAD_PRODUCT_SUCCESS = LOAD_PRODUCT + SUCCESS,
  LOAD_PRODUCT_FAILURE = LOAD_PRODUCT + FAILURE,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS_REQUEST = LOAD_PRODUCTS_BY_RECOMMENDATIONS + REQUEST,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS_SUCCESS = LOAD_PRODUCTS_BY_RECOMMENDATIONS + SUCCESS,
  LOAD_PRODUCTS_BY_RECOMMENDATIONS_FAILURE = LOAD_PRODUCTS_BY_RECOMMENDATIONS + FAILURE,
  LOAD_PRODUCTS_BY_RELATIONS_REQUEST = LOAD_PRODUCTS_BY_RELATIONS + REQUEST,
  LOAD_PRODUCTS_BY_RELATIONS_SUCCESS = LOAD_PRODUCTS_BY_RELATIONS + SUCCESS,
  LOAD_PRODUCTS_BY_RELATIONS_FAILURE = LOAD_PRODUCTS_BY_RELATIONS + FAILURE,
  LOAD_PRODUCTS_BY_SALE_REQUEST = LOAD_PRODUCTS_BY_SALE + REQUEST,
  LOAD_PRODUCTS_BY_SALE_SUCCESS = LOAD_PRODUCTS_BY_SALE + SUCCESS,
  LOAD_PRODUCTS_BY_SALE_FAILURE = LOAD_PRODUCTS_BY_SALE + FAILURE,
  LOAD_PRODUCTS_BY_SEARCH_REQUEST = LOAD_PRODUCTS_BY_SEARCH + REQUEST,
  LOAD_PRODUCTS_BY_SEARCH_SUCCESS = LOAD_PRODUCTS_BY_SEARCH + SUCCESS,
  LOAD_PRODUCTS_BY_SEARCH_FAILURE = LOAD_PRODUCTS_BY_SEARCH + FAILURE,
  CREATE_PRODUCT_REQUEST = CREATE_PRODUCT + REQUEST,
  CREATE_PRODUCT_SUCCESS = CREATE_PRODUCT + SUCCESS,
  CREATE_PRODUCT_FAILURE = CREATE_PRODUCT + FAILURE,
  UPDATE_PRODUCT_REQUEST = UPDATE_PRODUCT + REQUEST,
  UPDATE_PRODUCT_SUCCESS = UPDATE_PRODUCT + SUCCESS,
  UPDATE_PRODUCT_FAILURE = UPDATE_PRODUCT + FAILURE,
  DELETE_PRODUCT_REQUEST = DELETE_PRODUCT + REQUEST,
  DELETE_PRODUCT_SUCCESS = DELETE_PRODUCT + SUCCESS,
  DELETE_PRODUCT_FAILURE = DELETE_PRODUCT + FAILURE
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
  ILoadProductsRequestAction
  | ILoadProductsSuccessAction
  | ILoadProductsFailureAction
  | ILoadProductRequestAction
  | ILoadProductSuccessAction
  | ILoadProductFailureAction
  | ILoadProductsByRecommendationsRequestAction
  | ILoadProductsByRecommendationsSuccessAction
  | ILoadProductsByRecommendationsFailureAction
  | ILoadProductsByRelationsRequestAction
  | ILoadProductsByRelationsSuccessAction
  | ILoadProductsByRelationsFailureAction
  | ILoadProductsBySaleRequestAction
  | ILoadProductsBySaleSuccessAction
  | ILoadProductsBySaleFailureAction
  | ILoadProductsBySearchRequestAction
  | ILoadProductsBySearchSuccessAction
  | ILoadProductsBySearchFailureAction
  | ICreateProductRequestAction
  | ICreateProductSuccessAction
  | ICreateProductFailureAction
  | IUpdateProductRequestAction
  | IUpdateProductSuccessAction
  | IUpdateProductFailureAction
  | IDeleteProductRequestAction
  | IDeleteProductSuccessAction
  | IDeleteProductFailureAction
