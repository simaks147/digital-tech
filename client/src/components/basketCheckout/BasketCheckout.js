import React from 'react';
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {makeOrder} from "../../redux/actions";
import {connect} from "react-redux";

const BasketCheckout = ({makeOrder}) => (
  <div>
    <Container>
      {/*<div className={styles.buttons}>*/}
        <Button className='c-button' onClick={makeOrder}>Place Order</Button>
      {/*</div>*/}
    </Container>
  </div>
);

export default connect(null,{makeOrder})(BasketCheckout);
