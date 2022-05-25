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
import {loadProduct, increaseCart} from "../../redux/actions";
import ProductCarousel from "./productCarousel";
import ProductTabs from "./productTabs";
import Loader from "../loader";


const Product = ({product, increaseCart, loadProduct, loading, loaded}) => {
  useEffect(() => {
      loadProduct();
  }, [loadProduct]);

  if (loading) return <Loader/>;

  if (!loaded) return 'Error!!!';

  return (
    <div className={styles.section}>
      <Container>
        <Row className='align-items-center'>
          <Col md={{span: 5, order: 'last'}}>
            <div className={styles.content}>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.price}>${product.price}</div>
              <Button className='c-button' onClick={increaseCart}>Buy now!</Button>
            </div>
          </Col>
          <Col className='d-flex align-items-center flex-column-reverse flex-md-row' md={7}>
            <ProductCarousel product={product}/>
          </Col>
        </Row>
        <ProductTabs product={product}/>
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
