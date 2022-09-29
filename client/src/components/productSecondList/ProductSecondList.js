import React from 'react';
import {Alert, Container} from "react-bootstrap";
import styles from './productSecondList.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Loader from "../loader";
import ProductSecondListItem from "./productSecondListItem";
import {PropTypes as Types} from "prop-types";

const ProductSecondList = ({title, products, loading, errors}) => (
  <div className={styles.section}>
    <Container>
      <div className={styles.wrap}>
        <div className={styles.header}>{title}</div>
        <div className={styles.slider}>
          {
            loading && <Loader/>
          }
          {
            errors?.map((err, i) => (
              <Alert variant="danger" key={i}>{err}</Alert>
            ))
          }
          <Swiper
            modules={[Navigation]}
            slidesPerView={2}
            navigation={{prevEl: '.c-button-prev', nextEl: '.c-button-next'}}
            breakpoints={{768: {slidesPerView: 3}, 992: {slidesPerView: 4},}}
          >
            {
              products.map((product) => (
                <SwiperSlide key={product.slug}>
                  <ProductSecondListItem id={product.slug} product={product}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <div className='c-button-prev'></div>
          <div className='c-button-next'></div>
        </div>
      </div>
    </Container>
  </div>
);

ProductSecondList.propTypes = {
  title: Types.string,
  products: Types.arrayOf(Types.shape({
    slug: Types.string.isRequired
  }).isRequired).isRequired,
  loading: Types.bool.isRequired,
  errors: Types.arrayOf(Types.string),
};

export default ProductSecondList;
