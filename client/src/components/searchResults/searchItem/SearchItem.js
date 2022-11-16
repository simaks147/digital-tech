import React from 'react';
import styles from "./searchItem.module.css";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../utils/consts";
import ErrorBoundary from "../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images as imagesConfig} from "../../../config";
import {PropTypes as Types} from "prop-types";
import FormattedPrice from "../../formattedPrice";

const SearchItem = ({product}) => {
  const {title, slug, images, price, sale} = product;
  return (
    <div className={styles.main}>
      <Row className='align-items-center'>
        <Col xs='auto' className={styles.image}>
          <Link to={`${PRODUCT_ROUTE}/${slug}`}>
            <ErrorBoundary>
              <IKImage
                urlEndpoint={imagesConfig.urlEndpoint}
                path={images[0] || imagesConfig.defaultImage}
                transformation={[{
                  height: 60,
                  width: 60
                }]}/>
            </ErrorBoundary>
          </Link>
        </Col>
        <Col className={styles.title}>
          <Link to={`${PRODUCT_ROUTE}/${slug}`}>{title}</Link>
        </Col>
        <Col xs='auto' className={styles.price}>
          {
            !sale.discountPercent && <div className={styles.price}>
              <FormattedPrice value={price}/>
            </div>
          }
          {
            !!sale.discountPercent &&
            <>
              <div className={styles.oldPrice}>
                <FormattedPrice value={price}/>
              </div>
              <div className={styles.price}>
                <FormattedPrice value={sale.price}/>
              </div>
            </>
          }
        </Col>
      </Row>
    </div>
  );
}

SearchItem.propTypes = {
  product: Types.shape({
    title: Types.string,
    price: Types.number,
    slug: Types.string.isRequired,
    images: Types.arrayOf(Types.string).isRequired
  }).isRequired,
};

export default SearchItem;
