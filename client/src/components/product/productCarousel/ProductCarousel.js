import React, {useState} from 'react';
import styles from "./productCarousel.module.css";
import cn from "classnames";
import {Carousel} from "react-bootstrap";
import {IKImage} from 'imagekitio-react';
import {images} from "../../../config";
import ErrorBoundary from "../../ErrorBoundary";
import {PropTypes as Types} from "prop-types";

const ProductCarousel = ({product}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const handleSelectCarouselItem = (activeIndex) => setCarouselIndex(activeIndex);

  return (
    <>
      <div className={styles.indicators}>
        {
          product?.images.map((img, i) => (
            <div key={i}
                 onClick={() => handleSelectCarouselItem(i)}
                 className={cn({active: carouselIndex === i}, styles.indicatorsItem)}>
              {/*<img src={process.env.PUBLIC_URL + picture} alt=""/>*/}
              <ErrorBoundary>
                <IKImage
                  lqip={{active: true}}
                  urlEndpoint={images.urlEndpoint}
                  path={img}
                  transformation={[{
                    height: 54,
                    width: 54
                  }]}
                />
              </ErrorBoundary>
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
          product?.images.map((img, i) => (
            <Carousel.Item key={i} className={styles.picture}>
              {/*<img src={process.env.PUBLIC_URL + picture} alt=""/>*/}
              <ErrorBoundary>
                <IKImage
                  lqip={{active: true}}
                  urlEndpoint={images.urlEndpoint}
                  path={img}
                  transformation={[{
                    height: 500,
                    width: 500
                  }]}
                />
              </ErrorBoundary>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </>
  );
};

ProductCarousel.propTypes = {
  product: Types.shape({
    images: Types.arrayOf(Types.string)
  }).isRequired
};

export default ProductCarousel;

