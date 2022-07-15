import React, {useEffect} from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";
import ProductItem from "./productItem";
import {
  loadingProductsSelector,
  errorProductsSelector,
  productsIdsByCategorySelector,
  brandsByProductsSelector,
  routerSelector,
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadProductsByCategory} from "../../redux/actions";
import Loader from "../loader";
import ProductFilter from "../productFilter";
import styles from './productList.module.css';
import ProductSort from "../productSort";

const ProductList = ({subcategoryId, brands, productsIds, loadProductsByCategory, loading, errors}) => {
  useEffect(() => {
    const {page, limit} = queryParams;
    loadProductsByCategory(page, limit, subcategoryId);
  }, [loadProductsByCategory, subcategoryId]);

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
    <div className={styles.main}>
      <Container>
        <Row className="align-items-start">
          <Col lg={3}>
            <ProductFilter brands={brands}/>
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
  errors: errorProductsSelector(state, props),
  brands: brandsByProductsSelector(state, props),
  queryParams: routerSelector(state).location.query
});
export default connect(mapStateToProps, {loadProductsByCategory})(ProductList);
