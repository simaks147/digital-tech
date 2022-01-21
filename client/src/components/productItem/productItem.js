import React from 'react';
import {Row, Col} from "react-bootstrap";
import Figure from 'react-bootstrap/Figure'
import styles from './productItem.module.css';


const ProductItem = ({product}) => {
  return (
    <div>
        <Row>
          <Col xs='auto'>
            <Figure>
              <Figure.Image width={200} src={process.env.PUBLIC_URL + product.img}/>
            </Figure>
          </Col>
          <Col>
            <div className={styles.content}>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.subTitle}>{product.subTitle}</div>
              <div className={styles.description}>{product.description}</div>
              <div className={styles.price}>{product.price}</div>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default ProductItem;
