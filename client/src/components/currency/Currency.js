import React from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './currency.module.css';
import {connect} from "react-redux";
import {setCurrency} from '../../redux/actions'
import {checkedCurrencySelector, currenciesListSelector} from "../../redux/selectors";
import {PropTypes as Types} from "prop-types";

const Currency = ({currencies, setCurrency, checkedCurrency}) => (
  <Dropdown onSelect={(eventKey) => setCurrency(eventKey)}>
    <Dropdown.Toggle className={styles.toggle}>{checkedCurrency}</Dropdown.Toggle>
    <Dropdown.Menu className={styles.menu}>
      {
        currencies.map((cur) => <Dropdown.Item
          className={styles.item}
          key={cur.label}
          eventKey={cur.label}
          active={cur.label === checkedCurrency}>{cur.label}</Dropdown.Item>)
      }
    </Dropdown.Menu>
  </Dropdown>
);

Currency.propTypes = {
  currencies: Types.arrayOf(Types.shape({
    label: Types.string.isRequired
  })).isRequired,
  setCurrency: Types.func.isRequired,
  checkedCurrency: Types.string.isRequired
};

const mapStateToProps = (state) => ({
  currencies: currenciesListSelector(state),
  checkedCurrency: checkedCurrencySelector(state)
});

export default connect(mapStateToProps, {setCurrency})(Currency);
