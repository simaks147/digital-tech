import React, {useEffect} from 'react';
import styles from './productsList.module.css';
import {Alert, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {
  brandsListSelector,
  errorProductsSelector,
  loadingProductsSelector,
  productsLimitSelector,
  productsListSelector,
  productsPageSelector,
  productsSortSelector,
  totalCountProductsSelector
} from "../../../redux/selectors";
import {deleteProduct, loadProductsList} from "../../../redux/actions";
import Loader from "../../loader";
import {ADMIN_PRODUCT_ROUTE} from "../../../utils/consts";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProductFilter from "../../productFilter/ProductFilter";
import ProductSort from "../../productSort/ProductSort";
import Pagination from "../../pagination";
import ProductItem from "./productItem";

const ProductsList = ({products, brands, loadProductsList, loading, errors, totalCount, limit, limitVariants, sort, sortVariants, page}) => {
  useEffect(() => {
    loadProductsList(page, limit, sort);
  }, [loadProductsList, page, limit, sort, totalCount]);

  if (errors)
    return <div className={styles.main}>
      <div className={styles.section}>
        <Container>
          {
            errors.map((err, i) => (
              <Alert variant="danger" key={i}>{err}</Alert>
            ))
          }
        </Container>
      </div>
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
            <ProductSort
              showGridSwitcher={false}
              sortVariants={sortVariants}
              limitVariants={limitVariants}
            />
            <div className={styles.list}>
              {
                products.map(item => <ProductItem key={item.slug} product={item}/>)
              }
            </div>
            <Pagination limitVariants={limitVariants}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  products: productsListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state),
  brands: brandsListSelector(state),
  totalCount: totalCountProductsSelector(state),
  limit: productsLimitSelector(state, props),
  sort: productsSortSelector(state, props),
  page: productsPageSelector(state, props)
});

export default connect(mapStateToProps, {loadProductsList, deleteProduct})(ProductsList);
