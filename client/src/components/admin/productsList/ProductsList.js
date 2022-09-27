import React, {useEffect} from 'react';
import styles from './productsList.module.css';
import {Alert, Col, Container, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {
  brandsListSelector,
  errorProductsSelector,
  loadingProductsSelector,
  productsFiltersSelector,
  productsLimitSelector,
  productsListSelector,
  productsPageSelector,
  productsSortSelector,
  subcategoriesListSelector
} from "../../../redux/selectors";
import {loadProductsList} from "../../../redux/actions";
import Loader from "../../loader";
import {ADMIN_PRODUCT_ROUTE} from "../../../utils/consts";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProductFilter from "../../productFilter/ProductFilter";
import ProductSort from "../../productSort/ProductSort";
import Pagination from "../../pagination";
import ProductItem from "./productItem";
import {PropTypes as Types} from "prop-types";

const ProductsList = ({
                        products,
                        brands,
                        loadProductsList,
                        loading,
                        errors,
                        limit,
                        limitVariants,
                        sort,
                        sortVariants,
                        page,
                        filters,
                        subcategories
                      }) => {
  useEffect(() => {
    loadProductsList(page, limit, sort, filters);
  }, [loadProductsList, page, limit, sort, filters]);

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
            <ProductFilter brands={brands} subcategories={subcategories}/>
          </Col>
          <Col lg={9}>
            <ProductSort showGridSwitcher={false} sortVariants={sortVariants} limitVariants={limitVariants}/>
            {
              products.length > 0
                ?
                <div className={styles.list}>
                  {
                    products.map(item => <ProductItem key={item.slug} product={item}/>)
                  }
                </div>
                :
                <Alert variant="primary">No products for to the specified parameters</Alert>
            }
            <Pagination limitVariants={limitVariants}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ProductsList.propTypes = {
  products: Types.arrayOf(Types.shape({
    slug: Types.String
  }.isRequired)).isRequired,
  brands: Types.arrayOf(Types.object),
  errors: Types.arrayOf(Types.String),
  limit: Types.string.isRequired,
  sort: Types.string.isRequired,
  page: Types.number.isRequired,
  filters: Types.object.isRequired,
  subcategories: Types.arrayOf(Types.object),
  loadProductsList: Types.func.isRequired,
  limitVariants: Types.arrayOf(Types.string),
  sortVariants: Types.arrayOf(Types.string)
};

const mapStateToProps = (state, props) => ({
  products: productsListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state),
  brands: brandsListSelector(state),
  limit: productsLimitSelector(state, props),
  sort: productsSortSelector(state, props),
  page: productsPageSelector(state, props),
  filters: productsFiltersSelector(state, props),
  subcategories: subcategoriesListSelector(state)
});

export default connect(mapStateToProps, {loadProductsList})(ProductsList);
