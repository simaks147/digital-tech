import React, { FC } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { checkedCurrencySelector, currenciesSelector } from "../redux/selectors";
import { RootStateType } from '../redux/store';

interface IOwnProps {
  value: number
}

type IProps = IOwnProps & PropsFromRedux

const FormattedPrice: FC<IProps> = ({ value, currencies, currency }) => (`${currencies[currency].sign}${(currencies[currency].rate * value).toFixed(currencies[currency].fractionDigits)}`);

const mapStateToProps = (state: RootStateType) => ({
  currencies: currenciesSelector(state),
  currency: checkedCurrencySelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(FormattedPrice);
