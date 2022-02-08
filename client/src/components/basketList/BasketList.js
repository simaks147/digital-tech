import React from 'react';
import BasketItem from "./basketItem/BasketItem";
import styles from './BasketList.module.css';
import {Container, Row, Col, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {orderProductsSelector, orderTotalSelector} from "../../redux/selectors";
import {makeOrder} from "../../redux/actions";


const BasketList = ({order, total, makeOrder}) => {
  console.log(order);

  return (
    <div className={styles.section}>
      <Container>
        <Table borderless>
          <thead>
          <tr>
            <th>Products</th>
            <th></th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            order.map(item => (
              <BasketItem key={item.id} item={item}/>
            ))
          }
          </tbody>
        </Table>

        <div className={styles.total}>
          <Row className='justify-content-end' xs='auto'>
            <Col>
              <div className={styles.totalInner}>
                <div className={styles.totalCaption}>Total</div>
                <div className={styles.totalPrice}>${total}</div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.buttons}>
          <Button className='c-button2' as={Link} to='/'>Continue Shopping</Button>
          <Button className='c-button' onClick={makeOrder}>Process Checkout</Button>
        </div>
      </Container>
    </div>
  )
};

const mapStateToProps = (state, props) => ({
  order: orderProductsSelector(state, props),
  total: orderTotalSelector(state, props)
});

export default connect(mapStateToProps, {makeOrder})(BasketList);
