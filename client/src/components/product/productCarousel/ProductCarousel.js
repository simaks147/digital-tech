import React, {useState} from 'react';
import styles from "./productCarousel.module.css";
import cn from "classnames";
import {Carousel} from "react-bootstrap";

const ProductCarousel = ({product}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleSelectCarouselItem = (activeIndex) => setCarouselIndex(activeIndex);

  return (
    <>
      <div className={styles.indicators}>
        {
          product?.img.map((picture, i) => (
            <div key={i}
                 onClick={() => handleSelectCarouselItem(i)}
                 className={cn({active: carouselIndex === i}, styles.indicatorsItem)}>
              <img src={process.env.PUBLIC_URL + picture} alt=""/>
            </div>))
        }
      </div>
      <Carousel wrap={false}
                className={styles.inner}
                indicators={false}
                controls={false}
                activeIndex={carouselIndex}
                onSelect={handleSelectCarouselItem}>
        {
          product?.img.map((picture, i) => (
            <Carousel.Item key={i} className={styles.picture}>
              <img src={process.env.PUBLIC_URL + picture} alt=""/>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </>
  );
};

export default ProductCarousel;

