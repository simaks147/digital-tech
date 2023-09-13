import React, { FC } from 'react';
import styles from "./productItem.module.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ADMIN_PRODUCT_ROUTE, PRODUCT_ROUTE } from "../../../../utils/consts";
import ErrorBoundary from "../../../ErrorBoundary";
import { IKImage } from "imagekitio-react";
import { images as imagesConfig } from "../../../../config";
import { ReactComponent as EditIcon } from "../../../../icons/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../../../icons/delete-icon.svg";
import { connect, ConnectedProps } from "react-redux";
import { deleteProduct } from "../../../../redux/actions";
import { IProduct } from '../../../../redux/types/products';

interface IProps extends PropsFromRedux {
  product: IProduct
}

const ProductItem: FC<IProps> = ({ product, deleteProduct }) => {
  const { title, slug, images } = product;
  return (
    <div className={styles.main}>
      <Row className='align-items-center'>
        <Col xs='auto'>
          <Link to={`${PRODUCT_ROUTE}/${slug}`}>
            <ErrorBoundary>
              {/* @ts-ignore IKImage */}
              <IKImage
                urlEndpoint={imagesConfig.urlEndpoint}
                path={images[0] || imagesConfig.defaultImage}
                transformation={[{
                  height: '60',
                  width: '60'
                }]} />
            </ErrorBoundary>
          </Link>
        </Col>
        <Col className={styles.title}>
          <Link to={`${PRODUCT_ROUTE}/${slug}`}>{title}</Link>
        </Col>
        <Col xs='auto' className={styles.icons}>
          <Link to={`${ADMIN_PRODUCT_ROUTE}/${slug}`}>
            <EditIcon />
          </Link>
          <DeleteIcon onClick={() => deleteProduct(slug)} />
        </Col>
      </Row>
    </div>
  );
}

const connector = connect(null, { deleteProduct });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductItem);
