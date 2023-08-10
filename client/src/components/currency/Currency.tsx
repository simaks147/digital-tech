import React, { FC } from 'react';
import { Dropdown } from "react-bootstrap";
import styles from './currency.module.css';
import { connect, ConnectedProps } from "react-redux";
import { setCurrency } from '../../redux/actions'
import { checkedCurrencySelector, currenciesListSelector } from "../../redux/selectors";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const Currency: FC<IProps> = ({ currencies, setCurrency, checkedCurrency }) => (
  <Dropdown onSelect={(eventKey) => setCurrency(eventKey!)}>
    <Dropdown.Toggle className={styles.toggle}>{checkedCurrency}</Dropdown.Toggle>
    <Dropdown.Menu className={styles.menu}>
      {
        currencies.map((cur) => <Dropdown.Item
          key={cur.label}
          eventKey={cur.label}
          active={cur.label === checkedCurrency}>{cur.label}</Dropdown.Item>)
      }
    </Dropdown.Menu>
  </Dropdown>
);

const mapStateToProps = (state: RootStateType) => ({
  currencies: currenciesListSelector(state),
  checkedCurrency: checkedCurrencySelector(state)
});

const connector = connect(mapStateToProps, { setCurrency });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Currency);
