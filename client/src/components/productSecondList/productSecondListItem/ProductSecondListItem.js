import React from 'react';
import {PRODUCT_ROUTE} from "../../../utils/consts";
import styles from "../productSecondList.module.css";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../../config";
import {Link} from "react-router-dom";

const ProductSecondListItem = ({product}) => (
  <Link to={`${PRODUCT_ROUTE}/${product.slug}`} className={styles.item}>
    <Figure className={styles.itemPicture}>
      <ErrorBoundary>
        <IKImage
          lqip={{active: true}}
          loading="lazy"
          urlEndpoint={images.urlEndpoint}
          path={product.images[0] || images.defaultImage}
          transformation={[{
            height: 220,
            width: 220
          }]}/>
      </ErrorBoundary>
    </Figure>
    <div className={styles.itemTitle}>{product.title}</div>

    <div className={styles.itemPriceWrap}>
      {
        !product.sale.discountPercent && <span className={styles.itemPrice}>${product.price}</span>
      }
      {
        !!product.sale.discountPercent &&
        <>
          <span className={styles.itemOldPrice}>${product.price}</span>
          <span className={styles.itemPrice}>${product.sale.price}</span>
        </>
      }
    </div>
  </Link>
);

export default ProductSecondListItem;
