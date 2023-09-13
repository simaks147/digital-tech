import React, { FC, FormEvent, useMemo, useState } from 'react';
import styles from "./basketCheckout.module.css";
import { Col, Row, Container, FloatingLabel, Form, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { makeOrder } from "../../../redux/actions";
import { connect, ConnectedProps } from "react-redux";
import useForm from "../../../hooks/use-form";
import { processingOrderSelector, orderListSelector } from "../../../redux/selectors";
import Loader from "../../loader";
import { Redirect } from "react-router-dom";
import { HOME_ROUTE } from "../../../utils/consts";
import { CHECKOUT_FIELDS } from "../../../utils/consts";
import { RootStateType } from '../../../redux/store';

interface IProps extends PropsFromRedux { }

const BasketCheckout: FC<IProps> = ({ order, processing, makeOrder }) => {
  const initialValues = useMemo(
    () => CHECKOUT_FIELDS.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    [CHECKOUT_FIELDS]
  );
  const [validated, setValidated] = useState(false);
  const { values, handlers, reset } = useForm(initialValues);

  if (!order.length) return <Redirect to={HOME_ROUTE} />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
            {
              CHECKOUT_FIELDS.map(field => {
                const { id, label, message, ...rest } = field;
                return (
                  <Col className="mb-4" key={id}>
                    <FloatingLabel controlId={id} label={label}>
                      {/* @ts-ignore */}
                      <Form.Control disabled={processing}
                        {...rest}
                        {...handlers[id]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {field.message || 'Field must not be empty'}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                )
              })
            }
          </Row>
          <div className={styles.buttons}>
            <Button className='c-button' disabled={processing} type='submit'>
              {processing && <Loader />}
              Place Order
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

const mapStateToProps = (state: RootStateType) => ({
  order: orderListSelector(state),
  processing: processingOrderSelector(state)
});

const connector = connect(mapStateToProps, { makeOrder });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BasketCheckout);
