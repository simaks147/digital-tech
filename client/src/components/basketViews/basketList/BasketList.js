import React from 'react';
import BasketItem from "./basketItem/BasketItem";
import styles from './BasketList.module.css';
import {Container, Row, Col, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {orderProductsSelector, orderTotalSelector} from "../../../redux/selectors";
import {processCheckout} from "../../../redux/actions";
import {HOME_ROUTE} from "../../../utils/consts";

const BasketList = ({order, total, processCheckout}) => {
  return (
    <div className={styles.section}>
      <Container>
        {
          !!total &&
          <>
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
                  <BasketItem key={item.slug} item={item}/>
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
          </>
        }

        <div className={styles.buttons}>
          <Button className='c-button2' as={Link} to={HOME_ROUTE}>Continue Shopping</Button>
          { !!total && <Button className='c-button' onClick={processCheckout}>Process Checkout</Button> }
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  order: orderProductsSelector(state, props),
  total: orderTotalSelector(state, props)
});

export default connect(mapStateToProps, {processCheckout})(BasketList);
