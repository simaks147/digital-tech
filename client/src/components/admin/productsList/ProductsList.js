import React, {useEffect} from 'react';
import styles from './productsList.module.css';
import {Alert, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {
  brandsListSelector,
  errorProductsSelector,
  loadingProductsSelector,
  productsListSelector
} from "../../../redux/selectors";
import {deleteProduct, loadProductsList} from "../../../redux/actions";
import Loader from "../../loader";
import {PRODUCT_ROUTE, ADMIN_PRODUCT_ROUTE} from "../../../utils/consts";
import ErrorBoundary from "../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images as imagesConfig} from "../../../config";
import {Link} from "react-router-dom";
import {ReactComponent as EditIcon} from "../../../icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../icons/delete-icon.svg";
import Button from "react-bootstrap/Button";
import ProductFilter from "../../productFilter/ProductFilter";
import ProductSort from "../../productSort/ProductSort";

const ProductsList = ({products, brands, loadProductsList, loading, deleteProduct, errors}) => {
  useEffect(() => {
    loadProductsList();
  }, [loadProductsList]);

  if (errors)
    return <div className={styles.main}>
      <Container>
        {
          errors.map((err, i) => (
            <Alert variant="danger" key={i}>{err}</Alert>
          ))
        }
      </Container>
    </div>

  if (loading) return <Loader/>;

  return (
    <div className={styles.section}>
      <Container>
        <Button as={Link} to={ADMIN_PRODUCT_ROUTE} className='mb-4'>New Product</Button>
        <Row className="align-items-start">
          <Col lg={3}>
            <ProductFilter brands={brands}/>
          </Col>
          <Col lg={9}>
            <ProductSort showGridSwitcher={false}/>
            <div className={styles.list}>
              {
                products.map(item => {
                  const {title, slug, images} = item;

                  return <div key={slug} className={styles.item}>
                    <Row className='align-items-center'>
                      <Col xs='auto' className={styles.image}>
                        <Link to={`${PRODUCT_ROUTE}/${slug}`}>
                          <ErrorBoundary>
                            <IKImage
                              urlEndpoint={imagesConfig.urlEndpoint}
                              path={images[0]}
                              transformation={[{
                                height: 60,
                                width: 60
                              }]}/>
                          </ErrorBoundary>
                        </Link>
                      </Col>
                      <Col className={styles.title}>
                        <Link to={`${PRODUCT_ROUTE}/${slug}`}>{title}</Link>
                      </Col>
                      <Col xs='auto' className={styles.icons}>
                        <Link to={`${ADMIN_PRODUCT_ROUTE}/${slug}`}>
                          <EditIcon/>
                        </Link>
                        <DeleteIcon onClick={() => deleteProduct(slug)}/>
                      </Col>
                    </Row>
                  </div>
                })
              }
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: productsListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state),
  brands: brandsListSelector(state)
});

export default connect(mapStateToProps, {loadProductsList, deleteProduct})(ProductsList);
