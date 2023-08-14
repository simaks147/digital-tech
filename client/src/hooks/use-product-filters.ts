import { useReducer } from "react";
import { Range } from "react-input-range";

const CHANGE_PRICE = 'CHANGE_PRICE';
const CHANGE_BRAND = 'CHANGE_BRAND';
const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
const CHANGE_RATING = 'CHANGE_RATING';
const RESET = 'RESET';

interface IFilters {
  brand: string[],
  subcategoryId: string[],
  rating: number | null,
  minPrice: number,
  maxPrice: number
}

interface IFiltersChangePriceAction {
  type: typeof CHANGE_PRICE,
  value: Range
}

interface IFiltersChangeBrandAction {
  type: typeof CHANGE_BRAND,
  value: string,
  active: boolean
}

interface IFiltersChangeCategoryAction {
  type: typeof CHANGE_CATEGORY,
  value: string,
  active: boolean
}

interface IFiltersChangeRatingAction {
  type: typeof CHANGE_RATING,
  value: number,
  active: boolean
}

interface IFiltersResetAction {
  type: typeof RESET
}

type FiltersActionType =
  IFiltersChangePriceAction
  | IFiltersChangeBrandAction
  | IFiltersChangeCategoryAction
  | IFiltersChangeRatingAction
  | IFiltersResetAction


export default function useProductFilters(initFilters: IFilters) {
  const [currentFilters, setCurrentFilters] = useReducer((state: IFilters, action: FiltersActionType): IFilters => {
    switch (action.type) {
      case CHANGE_PRICE:
        return { ...state, minPrice: action.value.min, maxPrice: action.value.max };
      case CHANGE_BRAND:
        return { ...state, brand: action.active ? state.brand.filter((item) => item !== action.value) : [...state.brand, action.value] };
      case CHANGE_CATEGORY:
        return { ...state, subcategoryId: action.active ? state.subcategoryId.filter((item) => item !== action.value) : [...state.subcategoryId, action.value] };
      case CHANGE_RATING:
        return { ...state, rating: action.active ? null : action.value };
      case RESET:
        return {
          ...state,
          brand: [],
          subcategoryId: [],
          rating: null,
          minPrice: initFilters.minPrice,
          maxPrice: initFilters.maxPrice
        }
      default:
        return state;
    }
  }, initFilters);

  return {
    currentFilters,
    changePrice: (value: Range) => setCurrentFilters({
      type: CHANGE_PRICE,
      value
    }),
    changeBrand: (value: string, active: boolean) => setCurrentFilters({
      type: CHANGE_BRAND,
      value,
      active
    }),
    changeCategory: (value: string, active: boolean) => setCurrentFilters({
      type: CHANGE_CATEGORY,
      value,
      active
    }),
    changeRating: (value: number, active: boolean) => setCurrentFilters({
      type: CHANGE_RATING,
      value,
      active
    }),
    reset: () => setCurrentFilters({
      type: RESET
    })
  };
};
