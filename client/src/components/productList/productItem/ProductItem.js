import React from 'react';
import {connect} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import styles from './productItem.module.css';
import {orderSelector, productSelector, tokenSelector} from "../../../redux/selectors";
import {Link} from "react-router-dom";
import {increaseCart} from "../../../redux/actions";
import {PRODUCT_ROUTE, BASKET_ROUTE_SHOPPING, LOGIN_ROUTE} from "../../../utils/consts";
import {imagesUrlEndpoint} from "../../../config";
import {IKImage} from 'imagekitio-react';
import {push} from 'connected-react-router';

const ProductItem = ({product, order, token, increaseCart, push}) => (
  <div className={styles.main}>
    <Row>
      <Col md='auto'>
        <Link to={`${PRODUCT_ROUTE}/${product.slug}`} className={styles.picture}>
          <Figure>
            <IKImage
              urlEndpoint={imagesUrlEndpoint}
              path={product.images[0]}
              transformation={[{
                height: 260,
                width: 260
              }]}/>
          </Figure>
        </Link>
      </Col>
      <Col>
        <div className={styles.content}>
          <Row className='align-items-center'>
            <Col>
              <Link to={`${PRODUCT_ROUTE}/${product.slug}`} className={styles.info}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.subtitle}>{product.subTitle}</div>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.price}>${product.price}</div>
              </Link>
            </Col>
            <Col md='auto' className='mt-3 mt-md-0'>
              {
                order[product.slug]
                  ? <Button className='c-button2' onClick={() => push(BASKET_ROUTE_SHOPPING)}>In cart</Button>
                  : <Button className='c-button' onClick={token ? increaseCart : () => push(LOGIN_ROUTE)}>Add to cart</Button>
              }
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
);

const mapStateToProps = (state, props) => ({
  product: productSelector(state, props),
  order: orderSelector(state, props),
  token: tokenSelector(state, props)
});

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.id)),
  push: (route) => dispatch(push(route))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
