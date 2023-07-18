import { SET_CURRENCY } from "../consts";

interface ICurrencyType {
  label: string,
  rate: number,
  sign: string,
  fractionDigits: number
}

interface ICurrencyStateType {
  entities: { [key: string]: ICurrencyType },
  checkedCurrency: string
}

interface ICurrencyActionType {
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

export default (state = initialState, action: ICurrencyActionType): ICurrencyStateType => {
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
