import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import ProductItem from "./productItem";
import {
  loadingProductsSelector,
  loadedProductsSelector,
  productsIdsByCategorySelector,
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadProducts} from "../../redux/actions";
import Loader from "../loader";
import ProductFilter from "./productFilter";
import styles from './productList.module.css';
import ProductSort from "./productSort";

const ProductList = ({subcategoryId, productsIds, loadProducts, loading, loaded}) => {
  useEffect(() => {
    loadProducts(subcategoryId);
  }, [loadProducts, subcategoryId]);

  if (loading) return <Loader/>;

  if (!loaded) return 'Error!!!';

  return (
    <div className={styles.main}>
      <Container>
        <Row className="align-items-start">
          <Col lg={3}>
            <ProductFilter/>
          </Col>
          <Col lg={9}>
            <ProductSort/>
            <Row xs={1}>
              {
                productsIds.map(id => (
                    <Col key={id}>
                      <ProductItem id={id}/>
                    </Col>
                  )
                )
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  productsIds: productsIdsByCategorySelector(state, props),
  loading: loadingProductsSelector(state, props),
  loaded: loadedProductsSelector(state, props),
});
export default connect(mapStateToProps, {loadProducts})(ProductList);
