import React, {useEffect} from 'react';
import styles from './productsList.module.css';
import {Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {
  loadedProductsSelector,
  loadingProductsSelector,
  productsListSelector
} from "../../../redux/selectors";
import {deleteProduct, loadProductsList} from "../../../redux/actions";
import Loader from "../../loader";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import ErrorBoundary from "../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images as imagesConfig} from "../../../config";
import {Link} from "react-router-dom";
import cn from "classnames";
import {ReactComponent as EditIcon} from "../../../icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../icons/delete-icon.svg";

const ProductsList = ({products, loadProductsList, loaded, loading, deleteProduct}) => {
  useEffect(() => {
    loadProductsList();
  }, [loadProductsList]);

  if (loading) return <Loader/>;

  if (!loaded) return 'Error!!!';

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
                <EditIcon/>
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
  loaded: loadedProductsSelector(state)
});

export default connect(mapStateToProps, {loadProductsList, deleteProduct})(ProductsList);
