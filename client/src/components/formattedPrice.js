import React from 'react';
import {connect} from "react-redux";
import {checkedCurrencySelector, currenciesSelector} from "../redux/selectors";

const FormattedPrice = ({value, currencies, currency}) => (`${currencies[currency].sign}${(currencies[currency].rate * value).toFixed(currencies[currency].fractionDigits)}`);

const mapStateToProps = (state) => ({
  currencies: currenciesSelector(state),
  currency: checkedCurrencySelector(state)
});

export default connect(mapStateToProps)(FormattedPrice);
