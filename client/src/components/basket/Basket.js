import React from 'react';
import cn from 'classnames';
import {connect} from "react-redux";
import styles from './basket.module.css';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as Icon} from '../../icons/cart-icon.svg';
import {Link} from "react-router-dom";
import {orderCountSelector, orderTotalSelector} from "../../redux/selectors";
import Button from "react-bootstrap/Button";


const Basket = ({className, count, total}) => (
  <Link to='/basket' className={cn(styles.main, className)}>
    <Container>
      <Row>
        <Col xs={6}>
          <div className={styles.mainInner}>
            <Icon/>
            <div className={styles.count}>{count}</div>
          </div>
        </Col>
        <Col xs={6}>
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

export default connect(mapStateToProps)(Basket);
