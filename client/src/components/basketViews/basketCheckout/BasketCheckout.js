import React from 'react';
import styles from "./basketCheckout.module.css";
import {Col, Row, Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {makeOrder} from "../../../redux/actions";
import {connect} from "react-redux";
import useForm from "../../../hooks/use-form";

const initialValues = {
  // name: '',
  // email: '',
  phone: '',
  address: '',
  city: '',
  country: ''
};

const BasketCheckout = ({makeOrder}) => {
  const {values, handlers, reset} = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    makeOrder(values);
  };

  return (
    <div className={styles.section}>
      <Container>
        <Form>
          <Row xs={1} md={2} xl={4}>
            {/*<Col className="mb-4">*/}
            {/*  <FloatingLabel controlId="name" label="Name">*/}
            {/*    <Form.Control type="text" name="name" placeholder="First Name" {...handlers.name}/>*/}
            {/*  </FloatingLabel>*/}
            {/*</Col>*/}
            {/*<Col className="mb-4">*/}
            {/*  <FloatingLabel controlId="email" label="Email">*/}
            {/*    <Form.Control type="email" name="email" placeholder="Email" {...handlers.email}/>*/}
            {/*  </FloatingLabel>*/}
            {/*</Col>*/}
            <Col className="mb-4">
              <FloatingLabel controlId="phone" label="Phone">
                <Form.Control type="tel" name="phone" placeholder="Phone" {...handlers.phone}/>
              </FloatingLabel>
            </Col>
            <Col className="mb-4">
              <FloatingLabel controlId="address" label="Address">
                <Form.Control type="address" name="address" placeholder="Address" {...handlers.address}/>
              </FloatingLabel>
            </Col>
            <Col className="mb-4">
              <FloatingLabel controlId="city" label="City">
                <Form.Control type="text" name="city" placeholder="City" {...handlers.city}/>
              </FloatingLabel>
            </Col>
            <Col className="mb-4">
              <FloatingLabel controlId="country" label="Country">
                <Form.Select name="country" {...handlers.country}>
                  <option value="russia">Russia</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Form>
        <div className={styles.buttons}>
          <Button className='c-button' onClick={handleSubmit}>Place Order</Button>
        </div>
      </Container>
    </div>
  );
}

export default connect(null, {makeOrder})(BasketCheckout);
