import React, {useCallback, useState} from 'react';
import styles from './product.module.css';
import {connect} from "react-redux";
import {productSelector} from "../../redux/selectors";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import cn from "classnames";


const Product = ({product}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleSelectCarouselItem = (activeIndex) => setCarouselIndex(activeIndex);

  return (
    <div className={styles.section}>
      <Container>
        <Row>
          <Col className='d-flex' xs={7}>
            <div className={styles.carouselIndicators}>
              {
                product.img.map((picture, i) => (
                  <div key={i}
                       onClick={() => handleSelectCarouselItem(i)}
                       className={cn({active: carouselIndex === i}, styles.carouselIndicatorsItem)}>
                    <img src={process.env.PUBLIC_URL + picture} alt=""/>
                  </div>))
              }
            </div>
            <Carousel wrap={false}
                      className={styles.carousel}
                      indicators={false}
                      controls={false}
                      activeIndex={carouselIndex}
                      onSelect={handleSelectCarouselItem}>
              {
                product.img.map((picture, i) => (
                  <Carousel.Item key={i} className={styles.picture}>
                    <img src={process.env.PUBLIC_URL + picture} alt=""/>
                  </Carousel.Item>
                ))
              }
            </Carousel>
          </Col>
          <Col>

          </Col>
        </Row>
      </Container>
    </div>
  )
};

const mapStateToProps = (state, props) => ({
  product: productSelector(state, props)
})

export default connect(mapStateToProps)(Product);
