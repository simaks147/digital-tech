import { SET_CURRENCY } from "../consts";

interface ICurrency {
  label: string,
  rate: number,
  sign: string,
  fractionDigits: number
}

interface ICurrencyState {
  entities: { [key: string]: ICurrency },
  checkedCurrency: string
}

interface ICurrencyAction {
  type: typeof SET_CURRENCY,
  currency: string
}

const initialState = {
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
