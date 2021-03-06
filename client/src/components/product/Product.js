import React, {useEffect} from 'react';
import styles from './product.module.css';
import {connect} from "react-redux";
import {
  loadingProductsSelector,
  errorProductsSelector,
  productSelector,
  orderSelector,
  tokenSelector,
  productsSelector,
  ratingSelector, reviewsByProductSelector
} from "../../redux/selectors";
import {Alert, Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {loadProduct, increaseCart} from "../../redux/actions";
import ProductCarousel from "./productCarousel";
import ProductTabs from "./productTabs";
import Loader from "../loader";
import {BASKET_ROUTE_SHOPPING, LOGIN_ROUTE} from "../../utils/consts";
import {push} from "connected-react-router";
import Rate from "../rate/Rate";

const Product = ({products, id, product, order, token, increaseCart, push, loadProduct, loading, errors, reviews, rating}) => {
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  if (errors && !products[id])
    return <div className={styles.section}>
      <Container>
        {
          errors.map((err, i) => (
            <Alert variant="danger" key={i}>{err}</Alert>
          ))
        }
      </Container>
    </div>

  if (loading || !products[id]) return <Loader/>;

  return (
    <div className={styles.section}>
      <Container>
        <Row className='align-items-center'>
          <Col md={{span: 5, order: 'last'}}>
            <div className={styles.content}>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.overallRating}>
                <div className={styles.overallStars}>
                  <Rate value={rating.overall || product.rating.overall}/>
                </div>
                <div className={styles.overallSubtitle}>{reviews?.length || product.rating.reviewsCount} Reviews</div>
              </div>
              <div className={styles.price}>${product.price}</div>
              {
                order[product.slug]
                  ? <Button className='c-button2' onClick={() => push(BASKET_ROUTE_SHOPPING)}>In cart</Button>
                  : <Button className='c-button' onClick={token ? increaseCart : () => push(LOGIN_ROUTE)}>Buy
                    now!</Button>
              }
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
  products: productsSelector(state, props),
  product: productSelector(state, props),
  loading: loadingProductsSelector(state, props),
  errors: errorProductsSelector(state, props),
  order: orderSelector(state, props),
  token: tokenSelector(state, props),
  rating: ratingSelector(state, props.id),
  reviews: reviewsByProductSelector(state, props.id)
})

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.id)),
  loadProduct: () => dispatch(loadProduct(props.id)),
  push: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
