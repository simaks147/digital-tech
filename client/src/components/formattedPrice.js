import React from 'react';
import {connect} from "react-redux";
import {checkedCurrencySelector, currenciesSelector} from "../redux/selectors";
import {PropTypes as Types} from "prop-types";

const FormattedPrice = ({value, currencies, currency}) => (`${currencies[currency].sign}${(currencies[currency].rate * value).toFixed(currencies[currency].fractionDigits)}`);

const mapStateToProps = (state) => ({
  currencies: currenciesSelector(state),
  currency: checkedCurrencySelector(state)
});

FormattedPrice.propTypes = {
  value: Types.number.isRequired,
  currencies: Types.objectOf(Types.shape({
    label: Types.string.isRequired,
    rate: Types.number.isRequired,
    sign: Types.string,
    fractionDigits: Types.number.isRequired
  }).isRequired).isRequired,
  currency: Types.string.isRequired
};

export default connect(mapStateToProps)(FormattedPrice);
