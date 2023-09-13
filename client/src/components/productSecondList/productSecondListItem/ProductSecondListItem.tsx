import React, { FC } from 'react';
import { PRODUCT_ROUTE } from "../../../utils/consts";
import styles from "../productSecondList.module.css";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../../ErrorBoundary";
import { IKImage } from "imagekitio-react";
import { images } from "../../../config";
import { Link } from "react-router-dom";
import FormattedPrice from "../../formattedPrice";
import { IProduct } from '../../../redux/types/products';

interface IProps {
  product: IProduct
}

const ProductSecondListItem: FC<IProps> = ({ product }) => (
  <Link to={`${PRODUCT_ROUTE}/${product.slug}`} className={styles.item}>
    <Figure className={styles.itemPicture}>
      <ErrorBoundary>
        {/* @ts-ignore */}
        <IKImage
          lqip={{ active: true }}
          loading="lazy"
          urlEndpoint={images.urlEndpoint}
          path={product.images[0] || images.defaultImage}
          transformation={[{
            height: '220',
            width: '220'
          }]} />
      </ErrorBoundary>
    </Figure>
    <div className={styles.itemTitle}>{product.title}</div>

    <div className={styles.itemPricesWrap}>
      {
        !product.sale.discountPercent && <span className={styles.itemPrice}>
          <FormattedPrice value={product.price} />
        </span>
      }
      {
        !!product.sale.discountPercent &&
        <div className={styles.itemPricesWrap}>
          <span className={styles.itemOldPrice}>
            <FormattedPrice value={product.price} />
          </span>
          <span className={styles.itemPrice}>
            <FormattedPrice value={product.sale.price} />
          </span>
        </div>
      }
    </div>
  </Link>
);

export default ProductSecondListItem;
