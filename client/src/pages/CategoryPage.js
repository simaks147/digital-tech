import React, {useEffect} from 'react';
import {
  loadingCategoryProductsSelector,
  loadedCategoryProductsSelector,
  productsIdsByCategorySelector,
  subcategoryBySlugSelector
} from "../redux/selectors";
import {connect} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import ProductItem from "../components/productItem";
import {loadProducts} from '../redux/actions';
import Spinner from "react-bootstrap/Spinner";

const CategoryPage = ({productsIds, subcategory, loadProducts, loading, loaded}) => {
  console.log(subcategory);
  useEffect(() => {
    loadProducts('111_1');
  }, []);

  // if (loading) return (
  //   <Spinner animation="border" role="status" className='c-loader'>
  //     <span className="visually-hidden">Loading...</span>
  //   </Spinner>
  // )
  //
  // if (!loaded) return 'Error!!!';

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
}

const mapStateToProps = (state, props) => ({
  productsIds: productsIdsByCategorySelector(state, props),
  subcategory: subcategoryBySlugSelector(state, props),
  loading: loadingCategoryProductsSelector(state, props),
  loaded: loadedCategoryProductsSelector(state, props)
})

export default connect(mapStateToProps, {loadProducts})(CategoryPage);
