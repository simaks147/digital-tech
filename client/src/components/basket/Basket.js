import React from 'react';
import cn from 'classnames';
import styles from './basket.module.css';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as Icon} from '../../icons/cart-icon.svg';
import {Link} from "react-router-dom";


const Basket = ({className}) => (
  <Link to='/basket' className={cn(styles.main, className)}>
    <Container>
      <Row className={'justify-content-center align-content-center'}>
        <Col xs={'auto'}>
          <div className={styles.mainInner}>
            <Icon/>
            <div className={styles.count}>2</div>
          </div>
        </Col>
        <Col xs={'auto'}>
          <div className={styles.title}>Your Cart</div>
          <div className={styles.total}>$234,90</div>
        </Col>
      </Row>
    </Container>
  </Link>
);

export default Basket;
