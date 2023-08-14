import React, { FC, useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from "react-bootstrap";
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
import { connect, ConnectedProps } from "react-redux";
import { loadProductsByCategory } from "../../redux/actions";
import Loader from "../loader";
import ProductFilter from "../productFilter";
import styles from './productList.module.css';
import ProductSort from "../productSort";
import Pagination from "../pagination/Pagination";
import useWindowSize from "../../hooks/use-window-size";
import { windowWidth } from "../../config";
// import { Helmet } from "react-helmet";
import { RootStateType } from '../../redux/store';

interface IOwnProps {
  subcategoryId: string,
  limitVariants: string[],
  sortVariants: string[]
}

type IProps = IOwnProps & PropsFromRedux

const ProductList: FC<IProps> = ({
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

  const { width } = useWindowSize();

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

  if (loading) return <Loader />;

  return (
    <div className={styles.main}>
      {/*<Helmet>*/}
      {/*  <title>{}</title>*/}
      {/*  <meta name="description" content={} />*/}
      {/*</Helmet>*/}
      <Container>
        <Row className="align-items-start">
          <Col lg={3}>
            <ProductFilter brands={brands} />
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
                <Row xs={view === 'list' || width! < windowWidth.md ? 1 : 3}>
                  {
                    products.map(product => (
                      <Col key={product.slug}>
                        <ProductItem product={product} view={view} />
                      </Col>
                    )
                    )
                  }
                </Row>
                :
                <Alert variant="primary">No products for to the specified parameters</Alert>
            }
            <Pagination limitVariants={limitVariants} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootStateType, props: IOwnProps) => ({
  products: productsListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state),
  brands: brandsListSelector(state),
  limit: productsLimitSelector(state, props),
  sort: productsSortSelector(state, props),
  page: productsPageSelector(state, props),
  filters: productsFiltersSelector(state),
});

const connector = connect(mapStateToProps, { loadProductsByCategory });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductList);
