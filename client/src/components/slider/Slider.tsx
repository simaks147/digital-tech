import React, { FC } from 'react';
import { Alert, Container } from "react-bootstrap";
import styles from './slider.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../loader";
import SliderItem from "./sliderItem";
import { IProduct } from '../../redux/types/products';

interface IProps {
  products: IProduct[],
  loading: boolean,
  errors: string[] | null
}

const Slider: FC<IProps> = ({ products, loading, errors }) => (
  <div className={styles.section}>
    <Container>
      {
        loading && <Loader />
      }
      {
        errors?.map((err, i) => (
          <Alert variant="danger" key={i}>{err}</Alert>
        ))
      }
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
      >
        {
          products.map(product =>
            <SwiperSlide key={product.slug} style={{ backgroundColor: product.sale.bgColor }}>
              <SliderItem product={product} />
            </SwiperSlide>
          )
        }
      </Swiper>
    </Container>
  </div>
);

export default Slider;
