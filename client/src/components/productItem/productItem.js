import React from 'react';
import {Row, Col} from "react-bootstrap";
import Figure from 'react-bootstrap/Figure'
import Button from 'react-bootstrap/Button'
import styles from './productItem.module.css';


const ProductItem = ({product}) => (
  <div className={styles.main}>
    <Row>
      <Col xs='auto'>
        <Figure>
          <Figure.Image width={260} src={process.env.PUBLIC_URL + product.img}/>
        </Figure>
      </Col>
      <Col>
        <div className={styles.content}>
          <Row className='align-items-center'>
            <Col>
              <div className={styles.title}>{product.title}</div>
              <div className={styles.subtitle}>{product.subTitle}</div>
              <div className={styles.description}>{product.description}</div>
              <div className={styles.price}>${product.price}</div>
            </Col>
            <Col xs='auto'>
              <Button className='c-button'>Add to cart</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
);

export default ProductItem;
