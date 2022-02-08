import React from 'react';
import {connect} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';
import styles from './productItem.module.css';
import {productSelector} from "../../../redux/selectors";
import {Link} from "react-router-dom";
import {increaseCart} from "../../../redux/actions";


const ProductItem = ({product, increaseCart}) => (
  <div className={styles.main}>
    <Row>
      <Col md='auto'>
        <Link to={`/product/${product.slug}`} className={styles.picture}>
          <Figure>
            <Figure.Image width={260} src={process.env.PUBLIC_URL + product.img[0]}/>
          </Figure>
        </Link>
      </Col>
      <Col>
        <div className={styles.content}>
          <Row className='align-items-center'>
            <Col>
              <Link to={`/product/${product.slug}`} className={styles.info}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.subtitle}>{product.subTitle}</div>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.price}>${product.price}</div>
              </Link>
            </Col>
            <Col md='auto' className='mt-3 mt-md-0'>
              <Button className='c-button' onClick={increaseCart}>Add to cart</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </div>
);

const mapStateToProps = (state, props) => ({
  product: productSelector(state, props)
});

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
