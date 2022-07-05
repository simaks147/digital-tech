import React, {useEffect} from 'react';
import styles from './productsList.module.css';
import {Alert, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {
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
import cn from "classnames";
import {ReactComponent as EditIcon} from "../../../icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../icons/delete-icon.svg";

const ProductsList = ({products, loadProductsList, loading, deleteProduct, errors}) => {
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
        {
          products.map(item => {
            const {title, slug, images} = item;

            return <Row key={slug} className={cn(styles.item, 'flex-md-nowrap')}>
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
                  <EditIcon />
                </Link>
                <DeleteIcon onClick={() => deleteProduct(slug)}/>
              </Col>
            </Row>
          })
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: productsListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state)
});

export default connect(mapStateToProps, {loadProductsList, deleteProduct})(ProductsList);
