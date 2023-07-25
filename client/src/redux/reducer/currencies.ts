import { SET_CURRENCY } from "../consts";
import { ICurrencyState, ICurrencyAction } from "../types/currencies";

const initialState: ICurrencyState = {
  entities: {
    USD: { label: 'USD', rate: 1, sign: '$', fractionDigits: 2 },
    EUR: { label: 'EUR', rate: 1 / 1.1, sign: '€', fractionDigits: 2 },
    RUB: { label: 'RUB', rate: 60, sign: '₽', fractionDigits: 0 }
  },
  checkedCurrency: 'USD'
};

export default (state = initialState, action: ICurrencyAction): ICurrencyState => {
  const { type, currency } = action;

  switch (type) {
    case SET_CURRENCY:
      return {
        ...state,
        checkedCurrency: currency
      }
    default:
      return state;
  }
}
