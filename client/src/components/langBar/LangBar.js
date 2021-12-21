import React, {useState} from 'react';
import {Dropdown} from "react-bootstrap";
import './langBar.scss';

const LangBar = () => {
  const currencyArray = ['USD', 'EUR', 'RUB']

  const [currency, setCurrency] = useState(currencyArray[0]);

  return (
    <Dropdown className={'c-lang-bar'} onSelect={(eventKey) => setCurrency(eventKey)}>
      <Dropdown.Toggle className={'c-lang-bar__toggle'}>{currency}</Dropdown.Toggle>
      <Dropdown.Menu className={'c-lang-bar__menu'}>
        {
          currencyArray.map((cur) => <Dropdown.Item className={'c-lang-bar__item'} key={cur} eventKey={cur} active={cur === currency}>{cur}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LangBar;
