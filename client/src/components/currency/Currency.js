import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './currency.module.css';

const Currency = () => {
  const [currency, setCurrency] = useState('usd');

  return (
    <Dropdown onSelect={(eventKey) => setCurrency(eventKey)}>
      <Dropdown.Toggle className={styles.toggle}>{currency.toUpperCase()}</Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {
          ['usd', 'eur', 'rub'].map((cur) => <Dropdown.Item className={styles.item} key={cur} eventKey={cur} active={cur === currency}>{cur.toUpperCase()}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Currency;
