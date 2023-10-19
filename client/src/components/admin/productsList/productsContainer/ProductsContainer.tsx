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
} from "../../../../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { loadProductsList } from "../../../../redux/actions";
import Loader from "../../../loader";
import { RootStateType } from '../../../../redux/store';

interface IOwnProps { }

type IProps = IOwnProps & PropsFromRedux

const ProductsContainer: FC<IProps> = ({
  products,
  loadProductsList,
  loading,
  errors,
  limit,
  sort,
  page,
  filters
}) => {
  useEffect(() => {
    loadProductsList(page, limit, sort, filters);
  }, [loadProductsList, page, limit, sort, filters]);

  if (errors)
    return <div>
      <div>
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
    <>
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

const connector = connect(mapStateToProps, { loadProductsList });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductsContainer);
