import React, {useState} from 'react';
import {Alert, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {IKContext, IKImage, IKUpload} from 'imagekitio-react';
import Loader from "../../loader";
import ErrorBoundary from "../../ErrorBoundary";
import {Link} from "react-router-dom";
import {ReactComponent as DeleteIcon} from "../../../icons/close-icon.svg";
import useForm from "../../../hooks/use-form";
import useImageUpload from "../../../hooks/use-image-upload";
import useSpecification from "../../../hooks/use-specification";
import {connect} from "react-redux";
import {
  brandsListSelector,
  errorProductsSelector,
  processingProductsSelector,
  subcategoriesListSelector
} from "../../../redux/selectors";
import styles from "./product.module.css";
import cn from "classnames";
import {images as imagesConfig} from "../../../config";
import {PRODUCT_CREATION_FIELDS, ADMIN_ROUTE} from "../../../utils/consts";

const Product = (
  {
    id = undefined,
    initValues = {},
    initSpecification = [],
    initImages = [],
    buttonTitle,
    brands,
    subcategories,
    handleSetProduct,
    processing,
    errors
  }) => {

  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const {specification, addSpec, deleteSpec, changeSpec} = useSpecification(initSpecification);
  const {images, addImg, deleteImg} = useImageUpload(initImages);
  const {values, handlers} = useForm(initValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      const slug = id ? id : values.title.toLowerCase().split(' ').join('_');
      const specMap = specification.map(({title, desc}) => ({title, description: desc}));

      handleSetProduct(values, slug, images, specMap);
    }

    setValidated(true);
  };

  return (
    <div className={styles.section}>
      <Container>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <div className='d-flex justify-content-end mb-4'>
            <Button as={Link} to={ADMIN_ROUTE}>All Products</Button>
          </div>
          <Row xs={1}>
            {
              PRODUCT_CREATION_FIELDS(brands, subcategories).map(field => {
                const {id, label, message, ...rest} = field;
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
                      <Col key={i} className={cn(styles.image, 'mb-2')}>
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
                        <DeleteIcon onClick={() => deleteImg(i)}/>
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
                    onSuccess={res => addImg(res.name)}
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
            {buttonTitle}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  brands: brandsListSelector(state),
  subcategories: subcategoriesListSelector(state),
  processing: processingProductsSelector(state),
  errors: errorProductsSelector(state),
});

export default connect(mapStateToProps)(Product);
