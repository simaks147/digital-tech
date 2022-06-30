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
import {IKContext, IKImage, IKUpload} from 'imagekitio-react';
import {images as imagesConfig} from "../../../config";
import ErrorBoundary from "../../ErrorBoundary";
import useImageUpload from "../../../hooks/use-image-upload";

const ProductCreation = ({brands, subcategories, createProduct}) => {
  const processing = false;

  const initialValues = useMemo(
    () => PRODUCT_CREATION_FIELDS(brands, subcategories).reduce((acc, field) => ({...acc, [field.name]: ''}), {}),
    []
  );
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  // const [images, setImages] = useState([]);
  const {images, setImages} = useImageUpload();
  const {values, handlers, reset} = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = values.title.toLowerCase().split(' ').join('_');

    if (e.currentTarget.checkValidity()) createProduct(values, slug, images);

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

            {
              !!images.length &&
              <Col className="mb-4">
                <Row xs='auto'>
                  {
                    images.map((image, i) => (
                      <Col key={i}>
                        <ErrorBoundary>
                          <IKImage
                            urlEndpoint={imagesConfig.urlEndpoint}
                            path={image}
                            transformation={[{
                              height: 80,
                              width: 80
                            }]}
                          />
                        </ErrorBoundary>
                      </Col>
                    ))
                  }
                </Row>
              </Col>
            }

            <Col className="mb-4">
              <IKContext
                publicKey={imagesConfig.publicKey}
                urlEndpoint={imagesConfig.urlEndpoint}
                authenticationEndpoint={imagesConfig.authEndpoint}
              >
                <IKUpload
                  fileName={file}
                  onInput={ev => {
                    setFile(ev.target.files[0].name);
                  }}
                  onSuccess={res => setImages(res.name)}
                />
              </IKContext>
            </Col>
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
