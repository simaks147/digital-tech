import React, { FC } from 'react';
import { connect, ConnectedProps } from "react-redux";
import styles from './cart.module.css';
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Icon } from '../../icons/cart-icon.svg';
import { Link } from "react-router-dom";
import { orderCountSelector, orderTotalSelector } from "../../redux/selectors";
import { BASKET_ROUTE_SHOPPING } from "../../utils/consts";
import FormattedPrice from "../formattedPrice";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const Cart: FC<IProps> = ({ count, total }) => (
  <Link to={BASKET_ROUTE_SHOPPING} className={styles.main}>
    <Container>
      <Row>
        <Col xs={4}>
          <div className={styles.mainInner}>
            <Icon />
            <div className={styles.count}>{count}</div>
          </div>
        </Col>
        <Col xs={8}>
          <div className={styles.title}>Your Cart {!total && 'is Empty'}</div>
          {!!total && <div className={styles.total}>
            <FormattedPrice value={total} />
          </div>}
        </Col>
      </Row>
    </Container>
  </Link>
);

const mapStateToProps = (state: RootStateType) => ({
  count: orderCountSelector(state),
  total: orderTotalSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Cart);
