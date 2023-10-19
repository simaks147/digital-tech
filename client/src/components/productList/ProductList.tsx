import React, { FC, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import ProductFilter from "../productFilter";
import styles from './productList.module.css';
import ProductSort from "../productSort";
import Pagination from "../pagination/Pagination";
import ProductsContainer from './productsContainer';
import { RootStateType } from '../../redux/store';
import { connect, ConnectedProps } from "react-redux";
import { loadingProductsSelector } from '../../redux/selectors';

interface IOwnProps { }

type IProps = IOwnProps & PropsFromRedux

const ProductList: FC<IProps> = ({ loading }) => {
  const [view, setView] = useState('list');

  return (
    <div className={styles.main}>
      <Container>
        <Row>
          <Col lg={3}>
            <ProductFilter />
          </Col>
          <Col lg={9} className="position-relative" style={{ minHeight: '160px' }}>
            <ProductSort
              productView={view}
              changeProductView={setView}
            />
            <ProductsContainer view={view} />
            {loading || <Pagination />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  loading: loadingProductsSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductList);
