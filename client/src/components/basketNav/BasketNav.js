import React from 'react';
import cn from 'classnames';
import styles from './BasketNav.module.css';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as ArrowIcon} from '../../icons/arrow.svg';
import {ReactComponent as CartIcon} from '../../icons/cart-icon2.svg';


const BasketNav = () => (
  <div className={styles.section}>
    <Container>
      <div className={styles.sectionInner}>
        <Row xs='auto' className={cn(styles.header, 'justify-content-center', 'align-items-center')}>
          <Col>
            <CartIcon/>
            <span className={styles.title}>Shopping Cart</span>
          </Col>
        </Row>
        <Row xs='auto' className={cn(styles.list, 'justify-content-center', 'align-items-center')}>
          <Col>
            <div className={cn(styles.listItem, 'active')}>
              <div className={styles.listItemNum}>1</div>
              <div className={styles.listItemTitle}>Shopping Cart</div>
            </div>
          </Col>
          <Col>
            <ArrowIcon/>
          </Col>
          <Col>
            <div className={styles.listItem}>
              <div className={styles.listItemNum}>2</div>
              <div className={styles.listItemTitle}>Completed</div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </div>
);

export default BasketNav;
