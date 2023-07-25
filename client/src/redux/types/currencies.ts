import { SET_CURRENCY } from "../consts";

interface ICurrency {
  label: string,
  rate: number,
  sign: string,
  fractionDigits: number
}

export interface ICurrencyState {
  entities: { [key: string]: ICurrency },
  checkedCurrency: string
}

export interface ICurrencyAction {
  type: typeof SET_CURRENCY,
  currency: string
}

export default {}