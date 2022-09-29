import React from 'react';
import styles from "../slider.module.css";
import {Button, Col, Row} from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../../config";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import FormattedPrice from "../../formattedPrice";
import {PropTypes as Types} from "prop-types";

const SliderItem = ({product}) => (
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
          <span className={styles.itemPrice}>
            <FormattedPrice value={product.price}/>
          </span>
          <span className={styles.itemSalePrice}>
            <FormattedPrice value={product.sale.price}/>
          </span>
        </div>
        <Button className='c-button' as={Link} to={`${PRODUCT_ROUTE}/${product.slug}`}>Shop Now!</Button>
      </Col>
    </Row>
  </div>
);

SliderItem.propTypes = {
  product: Types.shape({
    sale: Types.shape({
      price: Types.number,
      title: Types.string,
      subTitle: Types.string,
      images: Types.arrayOf(Types.string).isRequired,
    }).isRequired,
    slug: Types.string.isRequired,
    title: Types.string,
    price: Types.number,
  }).isRequired
};

export default SliderItem;
