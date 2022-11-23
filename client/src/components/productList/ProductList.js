import React, {useEffect, useState} from 'react';
import {Alert, Col, Container, Row} from "react-bootstrap";
import ProductItem from "./productItem";
import {
  loadingProductsSelector,
  errorProductsSelector,
  productsListSelector,
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
import useWindowSize from "../../hooks/use-window-size";
import {windowWidth} from "../../config";
import {PropTypes as Types} from "prop-types";
import {Helmet} from "react-helmet";

const ProductList = ({
                       subcategoryId,
                       brands,
                       products,
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

  const {width} = useWindowSize();

  const [view, setView] = useState('list');

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
      {/*<Helmet>*/}
      {/*  <title>{}</title>*/}
      {/*  <meta name="description" content={} />*/}
      {/*</Helmet>*/}
      <Container>
        <Row className="align-items-start">
          <Col lg={3}>
            <ProductFilter brands={brands}/>
          </Col>
          <Col lg={9}>
            <ProductSort
              sortVariants={sortVariants}
              limitVariants={limitVariants}
              productView={view}
              changeProductView={setView}
            />
            {
              products.length > 0
                ?
                <Row xs={view === 'list' || width < windowWidth.md ? 1 : 3}>
                  {
                    products.map(product => (
                        <Col key={product.slug}>
                          <ProductItem id={product.slug} product={product} view={view}/>
                        </Col>
                      )
                    )
                  }
                </Row>
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

ProductList.propTypes = {
  subcategoryId: Types.string.isRequired,
  brands: Types.array,
  products: Types.arrayOf(Types.shape({
    slug: Types.string.isRequired
  }).isRequired).isRequired,
  loadProductsByCategory: Types.func.isRequired,
  loading: Types.bool.isRequired,
  errors: Types.arrayOf(Types.string),
  limit: Types.string.isRequired,
  limitVariants: Types.arrayOf(Types.string).isRequired,
  sort: Types.string.isRequired,
  sortVariants: Types.arrayOf(Types.string).isRequired,
  page: Types.number.isRequired,
  filters: Types.object
};

const mapStateToProps = (state, props) => ({
  products: productsListSelector(state, props),
  loading: loadingProductsSelector(state, props),
  errors: errorProductsSelector(state, props),
  brands: brandsListSelector(state, props),
  limit: productsLimitSelector(state, props),
  sort: productsSortSelector(state, props),
  page: productsPageSelector(state, props),
  filters: productsFiltersSelector(state, props),
});
export default connect(mapStateToProps, {loadProductsByCategory})(ProductList);
