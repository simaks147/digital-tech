import React from 'react';
import {Container} from "react-bootstrap";
import styles from './productSecondList.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Scrollbar} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import {PRODUCT_ROUTE} from "../../utils/consts";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../config";
import {Link} from "react-router-dom";

const ProductSecondList = ({title, products}) => {
  return (
    <div className={styles.section}>
      <Container>
        <div className={styles.wrap}>
          <div className={styles.header}>{title}</div>
          <div className={styles.slider}>
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              autoHeight={false}
              navigation={{
                prevEl: '.c-button-prev',
                nextEl: '.c-button-next'
              }}
              watchOverflow={false}
              scrollbar={{draggable: true}}
              breakpoints={
                {
                  768: {
                    slidesPerView: 3
                  },
                  992: {
                    slidesPerView: 4
                  },
                }
              }
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
};

export default ProductSecondList;
