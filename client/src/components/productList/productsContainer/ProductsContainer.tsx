import React, { FC, useEffect } from 'react';
import { Alert, Col, Container, Row } from "react-bootstrap";
import ProductItem from "./productItem";
import {
  loadingProductsSelector,
  errorProductsSelector,
  productsListSelector,
  productsLimitSelector,
  productsSortSelector,
  productsPageSelector,
  productsFiltersSelector
} from "../../../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { loadProductsByCategory } from "../../../redux/actions";
import Loader from "../../loader";
import useWindowSize from "../../../hooks/use-window-size";
import { windowWidth } from "../../../config";
import { RootStateType } from '../../../redux/store';
import { useRouteMatch } from 'react-router-dom';

interface IOwnProps {
  view: string
}

interface IRoutParams {
  slug: string
}

type IProps = IOwnProps & PropsFromRedux

const ProductsContainer: FC<IProps> = ({
  view,
  products,
  loadProductsByCategory,
  loading,
  errors,
  limit,
  sort,
  page,
  filters
}) => {
  const { params: { slug } } = useRouteMatch<IRoutParams>();

  useEffect(() => {
    loadProductsByCategory(page, limit, sort, filters, slug);
  }, [loadProductsByCategory, page, limit, sort, filters, slug]);

  const { width } = useWindowSize();
  if (errors)
    return <div>
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
    <>
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
    </>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  products: productsListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state),
  limit: productsLimitSelector(state),
  sort: productsSortSelector(state),
  page: productsPageSelector(state),
  filters: productsFiltersSelector(state),
});

const connector = connect(mapStateToProps, { loadProductsByCategory });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductsContainer);
