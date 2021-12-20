import React, {useState} from 'react';
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import style from './switchBar.module.scss';

const SwitchBar = () => {
  const currencyArray = ['USD', 'EUR', 'RUB']

  const [currency, setCurrency] = useState(currencyArray[0]);

  return (
    <Container>
      <Row>
        <Col>
          <Dropdown onSelect={(eventKey) => setCurrency(eventKey)}>
            <Dropdown.Toggle className={style.toggle}>{currency}</Dropdown.Toggle>
            <Dropdown.Menu>
              {
                currencyArray.map((cur) => <Dropdown.Item key={cur} eventKey={cur} active={cur === currency}>{cur}</Dropdown.Item>)
              }
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

export default SwitchBar;
