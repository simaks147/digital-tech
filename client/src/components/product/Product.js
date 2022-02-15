import React, {useEffect} from 'react';
import styles from './product.module.css';
import {connect} from "react-redux";
import {
  loadingProductsSelector,
  loadedProductsSelector,
  productSelector
} from "../../redux/selectors";
import {Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {loadProduct, increaseCart} from "../../redux/actions";
import ProductCarousel from "./productCarousel";


const Product = ({id, product, increaseCart, loadProduct, loading, loaded}) => {
  useEffect(() => {
      loadProduct();
  }, [loadProduct]);

  if (loading) return (
    <Spinner animation="border" role="status" className='c-loader'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )

  if (!loaded) return 'Error!!!';

  return (
    <div className={styles.section}>
      <Container>
        <Row>
          <Col md={{span: 5, order: 'last'}}>
            <div className={styles.content}>
              <div className={styles.title}>{product?.title}</div>
              <div className={styles.price}>${product?.price}</div>
              <Button className='c-button' onClick={increaseCart}>Buy now!</Button>
            </div>
          </Col>
          <Col className='d-flex' md={7}>
            <ProductCarousel id={id}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

const mapStateToProps = (state, props) => ({
  product: productSelector(state, props),
  loading: loadingProductsSelector(state, props),
  loaded: loadedProductsSelector(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.id)),
  loadProduct: () => dispatch(loadProduct(props.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
