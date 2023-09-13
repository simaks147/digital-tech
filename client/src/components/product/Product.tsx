import React, { FC, useEffect } from 'react';
import styles from './product.module.css';
import { connect, ConnectedProps } from "react-redux";
import {
  loadingProductsSelector,
  errorProductsSelector,
  productSelector,
  orderSelector,
  tokenSelector,
  productsSelector,
  ratingSelector,
  reviewsByProductSelector
} from "../../redux/selectors";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { loadProduct, increaseCart } from "../../redux/actions";
import ProductCarousel from "./productCarousel";
import ProductTabs from "./productTabs";
import Loader from "../loader";
import { BASKET_ROUTE_SHOPPING, LOGIN_ROUTE } from "../../utils/consts";
import { push } from "connected-react-router";
import Rate from "../rate/Rate";
import { IKImage } from "imagekitio-react";
import { images } from "../../config";
import ErrorBoundary from "../ErrorBoundary";
import FormattedPrice from "../formattedPrice";
import { Dispatch } from 'redux';
import { RootStateType } from '../../redux/store';
import { IProduct } from '../../redux/types/products';

interface IOwnProps {
  id: string
}

type IProps = IOwnProps & PropsFromRedux

const Product: FC<IProps> = ({
  products,
  id,
  product,
  order,
  token,
  increaseCart,
  push,
  loadProduct,
  loading,
  errors,
  reviews,
  rating
}) => {
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

  if (loading || !products[id])
    return <div className={styles.section}>
      <Container>
        <Loader />
      </Container>
    </div>

  return (
    <div className={styles.section}>
      <Container>
        <Row className='align-items-center'>
          <Col md={{ span: 5, order: 'last' }}>
            <div className={styles.content}>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.overallRating}>
                <div className={styles.overallStars}>
                  <Rate value={rating.overall || product.rating.overall} />
                </div>
                <div className={styles.overallSubtitle}>{reviews?.length || product.rating.reviewsCount} Reviews</div>
              </div>
              <div className={styles.spec}>
                {
                  [...Array(3)].map((_, i) => {
                    if (!product.specification[i]) return;
                    return <div className={styles.specItem} key={i}>
                      <span className={styles.specItemTitle}>{product.specification[i].title}: </span>
                      <span>{product.specification[i].description}</span>
                    </div>
                  }
                  )
                }
              </div>

              <div className={styles.priceWrap}>
                {
                  !product.sale.discountPercent &&
                  <span className={styles.price}>
                    <FormattedPrice value={product.price} />
                  </span>
                }
                {
                  !!product.sale.discountPercent &&
                  <>
                    <span className={styles.oldPrice}>
                      <FormattedPrice value={product.price} />
                    </span>
                    <span className={styles.price}>
                      <FormattedPrice value={product.sale.price} />
                    </span>
                  </>
                }
              </div>

              {
                order[product.slug]
                  ? <Button className='c-button2' onClick={() => push(BASKET_ROUTE_SHOPPING)}>In cart</Button>
                  :
                  <Button className='c-button' onClick={token ? () => increaseCart(product) : () => push(LOGIN_ROUTE)}>Buy
                    now!</Button>
              }
            </div>
          </Col>
          <Col className='d-flex align-items-center flex-column-reverse flex-md-row' md={7}>
            {
              product.images.length > 0
                ?
                <ProductCarousel product={product} />
                :
                <div className={styles.defaultImage}>
                  <ErrorBoundary>
                    {/* @ts-ignore */}
                    <IKImage
                      lqip={{ active: true }}
                      urlEndpoint={images.urlEndpoint}
                      path={images.defaultImage}
                      transformation={[{
                        height: '500',
                        width: '500'
                      }]}
                    />
                  </ErrorBoundary>
                </div>
            }
          </Col>
        </Row>
        <ProductTabs product={product} />
      </Container>
    </div>
  )
};

const mapStateToProps = (state: RootStateType, props: IOwnProps) => ({
  products: productsSelector(state),
  product: productSelector(state, props),
  loading: loadingProductsSelector(state),
  errors: errorProductsSelector(state),
  order: orderSelector(state),
  token: tokenSelector(state),
  rating: ratingSelector(state, props.id),
  reviews: reviewsByProductSelector(state, props.id)
});

const mapDispatchToProps = (dispatch: Dispatch, props: IOwnProps) => ({
  increaseCart: (product: IProduct) => dispatch(increaseCart(product)),
  /* @ts-ignore */
  loadProduct: () => dispatch(loadProduct(props.id)),
  push: (route: string) => dispatch(push(route))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Product);
