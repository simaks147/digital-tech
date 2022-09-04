import React from 'react';
import BasketItem from "./basketItem/BasketItem";
import styles from './BasketList.module.css';
import {Container, Row, Col, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {orderListSelector, orderTotalSelector} from "../../../redux/selectors";
import {processCheckout} from "../../../redux/actions";
import {HOME_ROUTE} from "../../../utils/consts";
import cn from "classnames";
import FormattedPrice from "../../formattedPrice";

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
                <th className="d-none d-md-block">Price</th>
                <th>Total</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {
                order.map(item => (
                  <BasketItem key={item.slug} id={item.slug} item={item}/>
                ))
              }
              </tbody>
            </Table>

            <div className={styles.total}>
              <Row className='justify-content-end' xs='auto'>
                <Col>
                  <div className={styles.totalInner}>
                    <div className={styles.totalCaption}>Total</div>
                    <div className={styles.totalPrice}>
                      <FormattedPrice value={total}/>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        }

        <div className={cn(styles.buttons, 'd-flex justify-content-end')}>
          { !!total && <Button className='c-button' onClick={processCheckout}>Process Checkout</Button> }
          <Button className='c-button2' as={Link} to={HOME_ROUTE}>Continue Shopping</Button>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = (state, props) => ({
  order: orderListSelector(state, props),
  total: orderTotalSelector(state, props)
});

export default connect(mapStateToProps, {processCheckout})(BasketList);
