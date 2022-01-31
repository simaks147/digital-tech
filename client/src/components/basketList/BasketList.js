import React from 'react';
// import cn from 'classnames';
import styles from './BasketList.module.css';
import {Container, Row, Col, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";


const BasketList = () => (
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
        <tr>
          <td className={styles.itemImg}>
            <div>
              <img src={process.env.PUBLIC_URL + '/img/products/iphone2.png'} alt=""/>
            </div>
          </td>
          <td className={styles.itemTitle}>
              Murphy Richards Kettle
          </td>
          <td className={styles.itemCount}>
            <div>
              <span>-</span>
              <span>2</span>
              <span>+</span>
            </div>
          </td>
          <td className={styles.itemPrice}>
              $45.90
          </td>
          <td className={styles.itemTotal}>
              $91.80
          </td>
          <td className={styles.itemDel}>
            <div>+</div>
          </td>
        </tr>
        </tbody>
      </Table>
      <div className={styles.total}>
        <Row className='justify-content-end' xs='auto'>
          <Col>
            <div className={styles.totalInner}>
              <div className={styles.totalCaption}>Total</div>
              <div className={styles.totalPrice}>$1,478.70</div>
            </div>
          </Col>
        </Row>
      </div>
      <div className={styles.buttons}>
        <Button className='c-button2'>Continue Shopping</Button>
        <Button className='c-button'>Process Checkout</Button>
      </div>
    </Container>
  </div>
);

export default BasketList;
