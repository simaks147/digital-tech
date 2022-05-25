import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './currency.module.css';
import {CURRENCIES} from "../../utils/consts";

const Currency = () => {
  const [currency, setCurrency] = useState(CURRENCIES[0]);

  return (
    <Dropdown onSelect={(eventKey) => setCurrency(eventKey)}>
      <Dropdown.Toggle className={styles.toggle}>{currency}</Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {
          CURRENCIES.map((cur) => <Dropdown.Item className={styles.item} key={cur} eventKey={cur} active={cur === currency}>{cur}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Currency;
