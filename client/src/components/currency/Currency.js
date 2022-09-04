import React from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './currency.module.css';
import {connect} from "react-redux";
import {setCurrency} from '../../redux/actions'
import {checkedCurrencySelector, currenciesListSelector} from "../../redux/selectors";

const Currency = ({currencies, setCurrency, checkedCurrency}) => {
  // const [currency, setCurrency] = useState('usd');

  return (
    <Dropdown onSelect={(eventKey) => setCurrency(eventKey)}>
      <Dropdown.Toggle className={styles.toggle}>{checkedCurrency}</Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {
          currencies.map((cur) => <Dropdown.Item className={styles.item} key={cur.label} eventKey={cur.label} active={cur.label === checkedCurrency}>{cur.label}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  currencies: currenciesListSelector(state),
  checkedCurrency: checkedCurrencySelector(state)
});

export default connect(mapStateToProps, {setCurrency})(Currency);
