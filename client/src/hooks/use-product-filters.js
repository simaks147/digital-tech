import {useReducer} from "react";

export default function useProductFilters(initFilters) {
  const [currentFilters, setCurrentFilters] = useReducer((state, action) => {
    const {type, value, active} = action;

    switch (type) {
      case 'changePrice':
        return {...state, minPrice: value.min, maxPrice: value.max};
      case 'changeBrand':
        return {...state, brand: active ? state.brand.filter((item) => item !== value) : [...state.brand, value]};
      case 'changeCategory':
        return {...state, subcategoryId: active ? state.subcategoryId.filter((item) => item !== value) : [...state.subcategoryId, value]};
      case 'changeRating':
        return {...state, rating: active ? null : value};
      case 'reset':
        return {
          ...state,
          brand: [],
          subcategoryId: [],
          rating: null,
          // minPrice: filters?.minPrice > minPrice && filters?.minPrice < maxPrice ? Math.floor(filters?.minPrice) : minPrice,
          // maxPrice: filters?.maxPrice > minPrice && filters?.maxPrice < maxPrice ? Math.floor(filters?.maxPrice) : maxPrice
        }
      default:
        return state;
    }
  }, initFilters);

  return {
    currentFilters,
    changePrice: (value) => setCurrentFilters({
      type: 'changePrice',
      value
    }),
    changeBrand: (value, active) => setCurrentFilters({
      type: 'changeBrand',
      value,
      active
    }),
    changeCategory: (value, active) => setCurrentFilters({
      type: 'changeCategory',
      value,
      active
    }),
    changeRating: (value, active) => setCurrentFilters({
      type: 'changeRating',
      value,
      active
    }),
    reset: () => setCurrentFilters({
      type: 'reset'
    })
  };
};
