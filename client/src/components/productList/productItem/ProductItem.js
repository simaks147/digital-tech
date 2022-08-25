import React from 'react';
import {connect} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import styles from './productItem.module.css';
import {
  orderSelector,
  productSalePriceSelector,
  tokenSelector
} from "../../../redux/selectors";
import {Link} from "react-router-dom";
import {increaseCart} from "../../../redux/actions";
import {PRODUCT_ROUTE, BASKET_ROUTE_SHOPPING, LOGIN_ROUTE} from "../../../utils/consts";
import {images, windowWidth} from "../../../config";
import {IKImage} from 'imagekitio-react';
import {push} from 'connected-react-router';
import ErrorBoundary from "../../ErrorBoundary";
import cn from "classnames";
import useWindowSize from "../../../hooks/use-window-size";

const ProductItem = ({product, order, token, increaseCart, push, view, productSalePrice}) => {
  const {width} = useWindowSize();

  return (
    <div className={cn(styles.main, {gridItem: view === 'grid' && width >= windowWidth.md})}>
      <Row>
        <Col sm='auto'>
          <Link to={`${PRODUCT_ROUTE}/${product.slug}`} className={styles.picture}>
            <Figure>
              <ErrorBoundary>
                <IKImage
                  lqip={{active: true}}
                  urlEndpoint={images.urlEndpoint}
                  path={product.images[0]}
                  transformation={[{
                    height: 260,
                    width: 260
                  }]}/>
              </ErrorBoundary>
            </Figure>
          </Link>
        </Col>
        <Col>
          <div className={styles.content}>
            <Row className='align-items-center'>
              <Col>
                <Link to={`${PRODUCT_ROUTE}/${product.slug}`} className={styles.info}>
                  <div className={styles.title}>{product.title}</div>
                  {
                    view === 'list' &&
                    <div className={styles.description}>{product.description.slice(0, 130)}...</div>
                  }
                  <div className={styles.priceWrap}>
                    {
                      !product.sale.discountPercent && <span className={styles.price}>${product.price}</span>
                    }
                    {
                      !!product.sale.discountPercent &&
                      <>
                        <span className={styles.oldPrice}>${product.price}</span>
                        <span className={styles.salePrice}>${productSalePrice}</span>
                      </>
                    }
                  </div>
                </Link>
              </Col>
              <Col md='auto' className={cn('mt-3 mt-md-0', styles.buttonContainer)}>
                {
                  order[product.slug]
                    ? <Button className='c-button2' onClick={() => push(BASKET_ROUTE_SHOPPING)}>In cart</Button>
                    : <Button className='c-button' onClick={token ? increaseCart : () => push(LOGIN_ROUTE)}>Add to
                      cart</Button>
                }
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  // product: productSelector(state, props),
  order: orderSelector(state, props),
  token: tokenSelector(state, props),
  productSalePrice: productSalePriceSelector(state, props)
});

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.id)),
  push: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
