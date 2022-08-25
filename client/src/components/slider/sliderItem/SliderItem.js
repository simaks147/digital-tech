import React from 'react';
import styles from "../slider.module.css";
import {Button, Col, Row} from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../../config";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import {productSalePriceSelector} from "../../../redux/selectors";
import {connect} from "react-redux";

const SliderItem = ({product, productSalePrice}) => (
  <div className={styles.item}>
    <Row xs={1} sm={2}>
      <Col sm={{order: 2}}>
        <Figure>
          <ErrorBoundary>
            <IKImage
              urlEndpoint={images.urlEndpoint}
              path={product.sale.images[0] || images.defaultImage}
              transformation={[{
                // height: 200,
                width: 460
              }]}/>
          </ErrorBoundary>
        </Figure>
      </Col>
      <Col style={{position: 'relative'}}>
        <div className={styles.itemSubTitle}>{product.sale.subtitle}</div>
        <div className={styles.itemTitle}>{product.sale.title}</div>
        <div className={styles.itemText}>{product.title}</div>
        <div className={styles.itemPriceWrap}>
          <span className={styles.itemPrice}>${product.price}</span>
          <span
            className={styles.itemSalePrice}>${productSalePrice}</span>
        </div>
        <Button className='c-button' as={Link} to={`${PRODUCT_ROUTE}/${product.slug}`}>Shop Now!</Button>
      </Col>
    </Row>
  </div>
);

const mapStateToProps = (state, props) => ({
  productSalePrice: productSalePriceSelector(state, props)
});

export default connect(mapStateToProps)(SliderItem);
