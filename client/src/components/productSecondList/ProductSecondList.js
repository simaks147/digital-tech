import React from 'react';
import {Alert, Container} from "react-bootstrap";
import styles from './productSecondList.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import {PRODUCT_ROUTE} from "../../utils/consts";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../config";
import {Link} from "react-router-dom";
import Loader from "../loader";

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
              products.map((item) => (
                <SwiperSlide key={item.slug}>
                  <Link to={`${PRODUCT_ROUTE}/${item.slug}`} className={styles.item}>
                    <Figure className={styles.itemPicture}>
                      <ErrorBoundary>
                        <IKImage
                          urlEndpoint={images.urlEndpoint}
                          path={item.images[0]}
                          transformation={[{
                            height: 220,
                            width: 220
                          }]}/>
                      </ErrorBoundary>
                    </Figure>
                    <div className={styles.itemTitle}>{item.title}</div>
                    <div className={styles.itemPrice}>${item.price}</div>
                  </Link>
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
export default ProductSecondList;
