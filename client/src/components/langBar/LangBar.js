import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import styles from './langBar.module.css';

const LangBar = () => {
  const currencyArray = ['USD', 'EUR', 'RUB']

  const [currency, setCurrency] = useState(currencyArray[0]);

  return (
    <Dropdown onSelect={(eventKey) => setCurrency(eventKey)}>
      <Dropdown.Toggle className={styles.toggle}>{currency}</Dropdown.Toggle>
      <Dropdown.Menu className={styles.menu}>
        {
          currencyArray.map((cur) => <Dropdown.Item className={styles.item} key={cur} eventKey={cur} active={cur === currency}>{cur}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LangBar;
