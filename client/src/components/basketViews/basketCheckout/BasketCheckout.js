import React, {useState} from 'react';
import styles from "./basketCheckout.module.css";
import {Col, Row, Container, FloatingLabel, Form, Alert} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {makeOrder} from "../../../redux/actions";
import {connect} from "react-redux";
import useForm from "../../../hooks/use-form";
import {processingOrderSelector, errorOrderSelector, orderListSelector} from "../../../redux/selectors";
import Loader from "../../loader";
import {Redirect} from "react-router-dom";
import {HOME_ROUTE} from "../../../utils/consts";

const initialValues = {
  phone: '',
  address: '',
  city: '',
  country: 'russia'
};

const BasketCheckout = ({order, processing, errors, makeOrder}) => {
  const [validated, setValidated] = useState(false);
  const {values, handlers, reset} = useForm(initialValues);

  if (!order.length) return <Redirect to={HOME_ROUTE}/>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) makeOrder(values);

    setValidated(true);
    // reset();
  };

  return (
    <div className={styles.section}>
      <Container>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Row xs={1} md={2} xl={4}>
            <Col className="mb-4">
              <FloatingLabel controlId="phone" label="Phone">
                <Form.Control type="tel" name="phone" placeholder="Phone" disabled={processing} required={true} {...handlers.phone}/>
                <Form.Control.Feedback type="invalid">
                  Field must not be empty
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col className="mb-4">
              <FloatingLabel controlId="address" label="Address">
                <Form.Control type="address" name="address" placeholder="Address" disabled={processing} required={true} {...handlers.address}/>
                <Form.Control.Feedback type="invalid">
                  Field must not be empty
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col className="mb-4">
              <FloatingLabel controlId="city" label="City">
                <Form.Control type="text" name="city" placeholder="City" disabled={processing} required={true} {...handlers.city}/>
                <Form.Control.Feedback type="invalid">
                  Field must not be empty
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            <Col className="mb-4">
              <FloatingLabel controlId="country" label="Country">
                <Form.Select name="country" disabled={processing} {...handlers.country}>
                  <option value="russia">Russia</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
          {
            errors?.map((err, i) => (
              <Alert variant="danger" key={i}>{err}</Alert>
            ))
          }
          <div className={styles.buttons}>
            <Button className='c-button' disabled={processing} type='submit'>
              {processing && <Loader/>}
              Place Order
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  order: orderListSelector(state, props),
  processing: processingOrderSelector(state, props),
  errors: errorOrderSelector(state, props)
});

export default connect(mapStateToProps, {makeOrder})(BasketCheckout);
