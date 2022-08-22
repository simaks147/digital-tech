import React from 'react';
import {Alert, Container} from "react-bootstrap";
import styles from './slider.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import Loader from "../loader";
import SliderItem from "./sliderItem";

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
        modules={[Navigation, Pagination]}
        navigation
        pagination={{clickable: true}}
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

export default Slider;
