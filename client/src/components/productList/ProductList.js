import React, {useEffect} from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";
import ProductItem from "./productItem";
import {
  loadingProductsSelector,
  errorProductsSelector,
  productsIdsByCategorySelector,
  brandsListSelector,
  productsLimitSelector,
  productsSortSelector,
  productsPageSelector,
  productsFiltersSelector,
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadProductsByCategory} from "../../redux/actions";
import Loader from "../loader";
import ProductFilter from "../productFilter";
import styles from './productList.module.css';
import ProductSort from "../productSort";
import Pagination from "../pagination/Pagination";

const ProductList = ({
                       subcategoryId,
                       brands,
                       productsIds,
                       loadProductsByCategory,
                       loading,
                       errors,
                       limit,
                       limitVariants,
                       sort,
                       sortVariants,
                       page,
                       filters
                     }) => {
  useEffect(() => {
    loadProductsByCategory(page, limit, sort, filters, subcategoryId);
  }, [loadProductsByCategory, page, limit, sort, filters, subcategoryId]);

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
            <ProductSort sortVariants={sortVariants} limitVariants={limitVariants}/>
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
            <Pagination limitVariants={limitVariants}/>
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
  brands: brandsListSelector(state, props),
  limit: productsLimitSelector(state, props),
  sort: productsSortSelector(state, props),
  page: productsPageSelector(state, props),
  filters: productsFiltersSelector(state, props),
});
export default connect(mapStateToProps, {loadProductsByCategory})(ProductList);
