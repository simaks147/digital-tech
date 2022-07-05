import React, {useEffect, useMemo, useState} from 'react';
import {Alert, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import useForm from "../../../hooks/use-form";
import {PRODUCT_CREATION_FIELDS} from "../../../utils/consts";
import Button from "react-bootstrap/Button";
import Loader from "../../loader";
import {connect} from "react-redux";
import {
  brandsListSelector,
  errorProductsSelector,
  loadingProductsSelector,
  processingProductsSelector,
  productSelector,
  subcategoriesListSelector
} from "../../../redux/selectors";
import styles from "./productUpdate.module.css";
import {updateProduct, loadProduct} from "../../../redux/actions";
import {IKContext, IKImage, IKUpload} from 'imagekitio-react';
import {images as imagesConfig} from "../../../config";
import ErrorBoundary from "../../ErrorBoundary";
import useImageUpload from "../../../hooks/use-image-upload";
import cn from "classnames";

const ProductUpdate = ({id, loadProduct, product, loading, brands, subcategories, updateProduct, processing, errors}) => {
  useEffect(() => {
    loadProduct(id);
  }, [loadProduct]);

  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const [specification, setSpec] = useState([]);
  const {images, setImages} = useImageUpload();
  const {values, handlers, reset} = useForm({
    title: product?.title,
    description: product?.description,
    price: product?.price,
  });

  if (loading || !product) return <Loader/>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = values.title.toLowerCase().split(' ').join('_');
    const specObj = specification.reduce((acc, {title, desc}) => {
      return {...acc, [title]: desc}
    }, {});

    if (e.currentTarget.checkValidity()) updateProduct(values, slug, images, specObj);

    setValidated(true);
    // reset();
  };

  const addSpec = () => setSpec([...specification, {title: '', desc: '', num: Date.now()}]);
  const deleteSpec = (num) => setSpec(specification.filter(spec => spec.num !== num));
  const changeSpec = (key, value, num) => setSpec(specification.map((spec) => spec.num === num ? {
    ...spec,
    [key]: value
  } : spec));

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
                      <Form.Control
                        disabled={processing}
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

            <Col className="mb-4">
              <p>Specification:</p>
              {
                specification.map(spec => {
                  const {title, desc, num} = spec;

                  return (
                    <Row xs={1} key={num}>
                      <Col className='mb-2' md={5}>
                        <FloatingLabel controlId={num} label={'Spec Title'}>
                          <Form.Control
                            value={title}
                            onChange={(e) => changeSpec('title', e.target.value, num)}
                            placeholder={'Spec Title'}
                            name={num}
                            required
                            disabled={processing}
                          />
                          <Form.Control.Feedback type="invalid">Field must not be empty</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col className='mb-2' md={5}>
                        <FloatingLabel controlId={num} label={'Spec Description'}>
                          <Form.Control
                            value={desc}
                            onChange={(e) => changeSpec('desc', e.target.value, num)}
                            placeholder={'Spec Description'}
                            name={num}
                            required
                            disabled={processing}
                          />
                          <Form.Control.Feedback type="invalid">Field must not be empty</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col className='mb-3' md={2}>
                        <Button onClick={() => deleteSpec(num)} disabled={processing}
                                className={styles.deleteSpecButton}>Delete</Button>
                      </Col>
                    </Row>
                  )
                })
              }
              <Button onClick={addSpec} disabled={processing}>Add Spec</Button>
            </Col>

            <Col className="mb-4">
              <p>Image Upload:</p>
              {
                !!images.length &&
                <Row xs='auto'>
                  {
                    images.map((image, i) => (
                      <Col key={i} className='mb-2'>
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
              }
              <Button className={styles.selectImgButton} disabled={processing}>
                Select Image
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
              </Button>
            </Col>
          </Row>
          {
            errors?.map((err, i) => (
              <Alert variant="danger" key={i}>{err}</Alert>
            ))
          }
          <Button className={cn('c-button', styles.createButton)} disabled={processing} type='submit'>
            {processing && <Loader/>}
            Create Product
          </Button>
        </Form>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  brands: brandsListSelector(state),
  subcategories: subcategoriesListSelector(state),
  processing: processingProductsSelector(state),
  errors: errorProductsSelector(state),
  product: productSelector(state, props),
  loading: loadingProductsSelector(state)
});

export default connect(mapStateToProps, {updateProduct, loadProduct})(ProductUpdate);
