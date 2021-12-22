import React from 'react';
import './basket.scss';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as Icon} from '../../icons/Cart-icon.svg';


const Basket = ({className}) => {
  return (
    <div className={`c-basket ${className}`}>
      <Container>
        <Row className={'justify-content-center align-content-center'}>
          <Col xs={'auto'}>
            <div className={'c-basket__inner'}>
              <Icon/>
              <div className={'c-basket__count'}>2</div>
            </div>
          </Col>
          <Col xs={'auto'}>
            <div className={'c-basket__title'}>Your Cart</div>
            <div className={'c-basket__total'}>$234,90</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Basket;
