import React, { FC } from 'react';
import styles from './productsList.module.css';
import { Col, Container, Row } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { loadingProductsSelector, subcategoriesListSelector } from "../../../redux/selectors";
import { ADMIN_PRODUCT_ROUTE } from "../../../utils/consts";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProductFilter from "../../productFilter/ProductFilter";
import ProductSort from "../../productSort/ProductSort";
import Pagination from "../../pagination";
import { RootStateType } from '../../../redux/store';
import ProductsContainer from './productsContainer';

interface IOwnProps { }

type IProps = IOwnProps & PropsFromRedux

const ProductsList: FC<IProps> = ({ subcategories, loading }) => {
  return (
    <div className={styles.section}>
      <Container>
        {/* @ts-ignore */}
        <Button as={Link} to={ADMIN_PRODUCT_ROUTE} className='mb-4'>New Product</Button>
        <Row>
          <Col lg={3}>
            <ProductFilter subcategories={subcategories} />
          </Col>
          <Col lg={9} className="position-relative" style={{ minHeight: '160px' }}>
            <ProductSort showGridSwitcher={false} />
            <ProductsContainer />
            {loading || <Pagination />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  subcategories: subcategoriesListSelector(state),
  loading: loadingProductsSelector(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductsList);
