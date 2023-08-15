import React, { FC, useEffect } from 'react';
import styles from './productsList.module.css';
import { Alert, Col, Container, Row } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
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
import { loadProductsList } from "../../../redux/actions";
import Loader from "../../loader";
import { ADMIN_PRODUCT_ROUTE } from "../../../utils/consts";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProductFilter from "../../productFilter/ProductFilter";
import ProductSort from "../../productSort/ProductSort";
import Pagination from "../../pagination";
import ProductItem from "./productItem";
import { RootStateType } from '../../../redux/store';

interface IOwnProps {
  limitVariants: string[],
  sortVariants: string[]
}

type IProps = IOwnProps & PropsFromRedux

const ProductsList: FC<IProps> = ({
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
    return <div>
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

  if (loading) return <Loader />;

  return (
    <div className={styles.section}>
      <Container>
        {/* @ts-expect-error */}
        <Button as={Link} to={ADMIN_PRODUCT_ROUTE} className='mb-4'>New Product</Button>
        <Row className="align-items-start">
          <Col lg={3}>
            <ProductFilter brands={brands} subcategories={subcategories} />
          </Col>
          <Col lg={9}>
            <ProductSort
              showGridSwitcher={false}
              sortVariants={sortVariants}
              limitVariants={limitVariants}
            />
            {
              products.length > 0
                ?
                <div>
                  {
                    products.map(item => <ProductItem key={item.slug} product={item} />)
                  }
                </div>
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
  subcategories: subcategoriesListSelector(state)
});

const connector = connect(mapStateToProps, { loadProductsList });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductsList);
