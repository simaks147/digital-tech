import React, {useMemo, useState} from 'react';
import {Alert, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import useForm from "../../../hooks/use-form";
import {PRODUCT_CREATION_FIELDS} from "../../../utils/consts";
import Button from "react-bootstrap/Button";
import Loader from "../../loader";
import {connect} from "react-redux";
import {brandsListSelector, subcategoriesListSelector} from "../../../redux/selectors";
import styles from "./productCreation.module.css";
import {createProduct} from "../../../redux/actions";

const ProductCreation = ({brands, subcategories, createProduct}) => {
  const processing = false;

  const initialValues = useMemo(
    () => PRODUCT_CREATION_FIELDS(brands, subcategories).reduce((acc, field) => ({...acc, [field.name]: ''}), {}),
    []
  );
  const [validated, setValidated] = useState(false);
  const {values, handlers, reset} = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = values.title.toLowerCase().split(' ').join('_');

    if (e.currentTarget.checkValidity()) createProduct(values, slug);

    setValidated(true);
    // reset();
  };

  return (
    <div className={styles.section}>
      <Container>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Row xs={1}>
            {
              PRODUCT_CREATION_FIELDS(brands, subcategories).map(field => {
                const {id, label, message, initialValue, ...rest} = field;
                return (
                  <Col className="mb-4" key={id}>
                    <FloatingLabel controlId={id} label={label}>
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
          {/*{*/}
          {/*  errors?.map((err, i) => (*/}
          {/*    <Alert variant="danger" key={i}>{err}</Alert>*/}
          {/*  ))*/}
          {/*}*/}
          {/*<div className={styles.buttons}>*/}
          <Button className='c-button' disabled={processing} type='submit'>
            {processing && <Loader/>}
            Create Product
          </Button>
          {/*</div>*/}
        </Form>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: brandsListSelector(state),
  subcategories: subcategoriesListSelector(state)
});

export default connect(mapStateToProps, {createProduct})(ProductCreation);
