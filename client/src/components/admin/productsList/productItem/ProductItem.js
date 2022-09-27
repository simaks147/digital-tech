import React from 'react';
import styles from "./productItem.module.css";
import {Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ADMIN_PRODUCT_ROUTE, PRODUCT_ROUTE} from "../../../../utils/consts";
import ErrorBoundary from "../../../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images as imagesConfig} from "../../../../config";
import {ReactComponent as EditIcon} from "../../../../icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../icons/delete-icon.svg";
import {connect} from "react-redux";
import {deleteProduct} from "../../../../redux/actions";
import {PropTypes as Types} from "prop-types";

const ProductItem = ({product, deleteProduct}) => {
  const {title, slug, images, price, rating} = product;
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
        <Col>
          <div>{price}</div>
        </Col>
        <Col>
          <div>{rating.overall}</div>
        </Col>
        <Col xs='auto' className={styles.icons}>
          <Link to={`${ADMIN_PRODUCT_ROUTE}/${slug}`}>
            <EditIcon/>
          </Link>
          <DeleteIcon onClick={() => deleteProduct(slug)}/>
        </Col>
      </Row>
    </div>
  );
}

ProductItem.propTypes = {
  product: Types.shape({
    title: Types.string,
    slug: Types.string.isRequired,
    images: Types.arrayOf(Types.string).isRequired,
    price: Types.number,
    rating: Types.shape({
      overall: Types.number
    })
  }).isRequired,
};

export default connect(null, {deleteProduct})(ProductItem);
