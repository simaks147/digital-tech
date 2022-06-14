import React from 'react';
import {connect} from "react-redux";
import styles from './cart.module.css';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as Icon} from '../../icons/cart-icon.svg';
import {Link} from "react-router-dom";
import {orderCountSelector, orderTotalSelector} from "../../redux/selectors";
import {BASKET_ROUTE_SHOPPING} from "../../utils/consts";

const Cart = ({className, count, total}) => (
  <Link to={BASKET_ROUTE_SHOPPING} className={styles.main}>
    <Container>
      <Row>
        <Col xs={5} md={6}>
          <div className={styles.mainInner}>
            <Icon/>
            <div className={styles.count}>{count}</div>
          </div>
        </Col>
        <Col xs={7} md={6}>
          <div className={styles.title}>Your Cart { !total && 'is Empty'}</div>
          { !!total && <div className={styles.total}>${total}</div> }
        </Col>
      </Row>
    </Container>
  </Link>
);

const mapStateToProps = (state, props) => ({
  count: orderCountSelector(state, props),
  total: orderTotalSelector(state, props)
});

export default connect(mapStateToProps)(Cart);
