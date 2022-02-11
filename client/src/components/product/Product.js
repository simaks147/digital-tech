import React, {useEffect, useState} from 'react';
import styles from './product.module.css';
import {connect} from "react-redux";
import {
  loadingProductsSelector,
  loadedProductsSelector,
  productSelector
} from "../../redux/selectors";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import cn from "classnames";
import Button from "react-bootstrap/Button";
import {increaseCart} from "../../redux/actions";
import Spinner from "react-bootstrap/Spinner";
import {loadProduct} from "../../redux/actions";


const Product = ({product, increaseCart, loadProduct, loading, loaded}) => {
  useEffect(() => {
      loadProduct();
  }, [loadProduct]);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleSelectCarouselItem = (activeIndex) => setCarouselIndex(activeIndex);

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
            <div className={styles.carouselIndicators}>
              {
                product?.img.map((picture, i) => (
                  <div key={i}
                       onClick={() => handleSelectCarouselItem(i)}
                       className={cn({active: carouselIndex === i}, styles.carouselIndicatorsItem)}>
                    <img src={process.env.PUBLIC_URL + picture} alt=""/>
                  </div>))
              }
            </div>
            <Carousel wrap={false}
                      className={styles.carousel}
                      indicators={false}
                      controls={false}
                      activeIndex={carouselIndex}
                      onSelect={handleSelectCarouselItem}>
              {
                product?.img.map((picture, i) => (
                  <Carousel.Item key={i} className={styles.picture}>
                    <img src={process.env.PUBLIC_URL + picture} alt=""/>
                  </Carousel.Item>
                ))
              }
            </Carousel>
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
