import React, { ElementType, FC, ReactNode } from 'react';
import styles from "../slider.module.css";
import { Button, Col, Row } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../../ErrorBoundary";
import { IKImage } from "imagekitio-react";
import { images } from "../../../config";
import { Link } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../../utils/consts";
import FormattedPrice from "../../formattedPrice";
import { IProduct } from '../../../redux/types/products';

interface IProps {
  product: IProduct
}

const SliderItem: FC<IProps> = ({ product }) => (
  <div className={styles.item}>
    <Row xs={1} sm={2}>
      <Col sm={{ order: 2 }}>
        <Figure>
          <ErrorBoundary>
            {/* @ts-expect-error IKImage */}
            <IKImage
              urlEndpoint={images.urlEndpoint}
              path={product.sale.images[0] || images.defaultImage}
              transformation={[{
                // height: 200,
                width: '460'
              }]} />
          </ErrorBoundary>
        </Figure>
      </Col>
      <Col style={{ position: 'relative' }}>
        <div className={styles.itemSubTitle}>{product.sale.subtitle}</div>
        <div className={styles.itemTitle}>{product.sale.title}</div>
        <div className={styles.itemText}>{product.title}</div>
        <div className={styles.itemPriceWrap}>
          <span className={styles.itemPrice}>
            <FormattedPrice value={product.price} />
          </span>
          <span className={styles.itemSalePrice}>
            <FormattedPrice value={product.sale.price} />
          </span>
        </div>
        <Link className='c-button' component={Button} to={`${PRODUCT_ROUTE}/${product.slug}`}>Shop Now!</Link>
      </Col>
    </Row>
  </div>
);

export default SliderItem;
