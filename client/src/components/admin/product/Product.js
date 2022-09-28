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
import {PropTypes as Types} from "prop-types";

const Product = (
  {
    id,
    initValues,
    initSpecification,
    initImages,
    initSaleImages,
    buttonTitle,
    brands,
    subcategories,
    handleSetProduct,
    processing,
    errors
  }) => {

  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState(null);
  const [saleFile, setSaleFile] = useState(null);
  const {specification, addSpec, deleteSpec, changeSpec} = useSpecification(initSpecification);
  const {images, addImg, deleteImg} = useImageUpload(initImages);
  const {images: saleImages, addImg: addSaleImg, deleteImg: deleteSaleImg} = useImageUpload(initSaleImages);
  const {values, handlers} = useForm(initValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.currentTarget.checkValidity()) {
      const slug = id ? id : values.title.toLowerCase().split(' ').join('_');
      const specMap = specification.map(({title, desc}) => ({title, description: desc}));

      handleSetProduct(values, slug, images, specMap, saleImages);
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
                const {id, label, message, header, ...rest} = field;

                if (header) return <p className={styles.header} key={id}>{header}:</p>;

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
              {/*<p className={styles.header}>Sale image upload:</p>*/}
              {
                !!saleImages.length &&
                <Row xs='auto'>
                  {
                    saleImages.map((image, i) => (
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
                        <DeleteIcon onClick={() => deleteSaleImg(i)}/>
                      </Col>
                    ))
                  }
                </Row>
              }
              <Button className={styles.selectImgButton} disabled={processing}>
                Select Sale Image
                <IKContext
                  publicKey={imagesConfig.publicKey}
                  urlEndpoint={imagesConfig.urlEndpoint}
                  authenticationEndpoint={imagesConfig.authEndpoint}
                >
                  <IKUpload
                    fileName={saleFile}
                    onInput={ev => {
                      setSaleFile(ev.target.files[0].name);
                    }}
                    onSuccess={res => addSaleImg(res.name)}
                  />
                </IKContext>
              </Button>
            </Col>


            <Col className="mb-4">
              <p className={styles.header}>Specification:</p>
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
              <p className={styles.header}>Images upload:</p>
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
                Select Images
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
          <Button className={cn('c-button mt-3', styles.createButton)} disabled={processing} type='submit'>
            {processing && <Loader/>}
            {buttonTitle}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

Product.propTypes = {
  id: Types.string,
  initValues: Types.shape({
    title: Types.string,
    description: Types.string,
    price: Types.number,
    brand: Types.string,
    subcategoryId: Types.string,
    discountPercent: Types.number,
    saleTitle: Types.string,
    saleSubtitle: Types.string,
    saleBgColor: Types.string,
  }).isRequired,
  initSpecification: Types.arrayOf(Types.shape({
    title: Types.string,
    desc: Types.string,
    num: Types.string
  })),
  initImages: Types.arrayOf(Types.string),
  initSaleImages: Types.arrayOf(Types.string),
  buttonTitle: Types.string,
  brands: Types.arrayOf(Types.shape({
    id: Types.string.isRequired,
    title: Types.string.isRequired,
  })).isRequired,
  subcategories: Types.arrayOf(Types.shape({
    slug: Types.string.isRequired,
    title: Types.string.isRequired,
  })).isRequired,
  handleSetProduct: Types.func.isRequired,
  processing: Types.bool.isRequired,
  errors: Types.arrayOf(Types.string)
};

Product.defaultProps = {
  initValues: {
    title: '',
    description: '',
    price: 0,
    brand: '',
    subcategoryId: '',
    discountPercent: 0,
    saleTitle: 'Sale!',
    saleSubtitle: 'At the best price',
    saleBgColor: 'black'
  },
  initSpecification: [],
  initImages: [],
  initSaleImages: [],
};

const mapStateToProps = (state) => ({
  brands: brandsListSelector(state),
  subcategories: subcategoriesListSelector(state),
  processing: processingProductsSelector(state),
  errors: errorProductsSelector(state),
});

export default connect(mapStateToProps)(Product);
