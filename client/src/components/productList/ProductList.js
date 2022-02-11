import React, {useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import ProductItem from "./productItem";
import {
  loadingProductsSelector,
  loadedProductsSelector,
  productsIdsByCategorySelector,
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadProducts} from "../../redux/actions";

const ProductList = ({subcategoryId, productsIds, loadProducts, loading, loaded}) => {
  useEffect(() => {
    // if (!subcategories[subcategoryId])
    loadProducts(subcategoryId);
  }, [loadProducts, subcategoryId]);

  if (loading) return (
    <Spinner animation="border" role="status" className='c-loader'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )

  if (!loaded) return 'Error!!!';

  return (
    <div>
      <Container>
        <Row xs={1}>
          {
            productsIds.map(id => (
                <Col key={id} className='my-3'>
                  <ProductItem id={id}/>
                </Col>
              )
            )
          }
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  productsIds: productsIdsByCategorySelector(state, props),
  loading: loadingProductsSelector(state, props),
  loaded: loadedProductsSelector(state, props),
});
export default connect(mapStateToProps, {loadProducts})(ProductList);
