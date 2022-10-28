import React from 'react';
import {Alert, Container} from "react-bootstrap";
import styles from './slider.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination, Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Loader from "../loader";
import SliderItem from "./sliderItem";
import {PropTypes as Types} from "prop-types";

const Slider = ({products, loading, errors}) => (
  <div className={styles.section}>
    <Container>
      {
        loading && <Loader/>
      }
      {
        errors?.map((err, i) => (
          <Alert variant="danger" key={i}>{err}</Alert>
        ))
      }
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{clickable: true}}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
      >
        {
          products.map(product =>
            <SwiperSlide key={product.slug} style={{backgroundColor: product.sale.bgColor}}>
              <SliderItem id={product.slug} product={product}/>
            </SwiperSlide>
          )
        }
      </Swiper>
    </Container>
  </div>
);

Slider.propTypes = {
  products: Types.arrayOf(Types.shape({
    slug: Types.string.isRequired,
    sale: Types.shape({
      bgColor: Types.string
    }).isRequired
  }).isRequired).isRequired,
  loading: Types.bool.isRequired,
  errors: Types.arrayOf(Types.string)
};

export default Slider;
