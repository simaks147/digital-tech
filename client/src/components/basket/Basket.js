import React from 'react';
import cn from 'classnames';
import styles from './basket.module.css';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as Icon} from '../../icons/Cart-icon.svg';


const Basket = ({className}) => (
  <div className={cn(styles.section, className)}>
    <Container>
      <Row className={'justify-content-center align-content-center'}>
        <Col xs={'auto'}>
          <div className={styles.sectionInner}>
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
  </div>
);

export default Basket;
