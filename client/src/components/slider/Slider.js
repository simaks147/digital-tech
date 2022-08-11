import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import styles from './slider.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../utils/consts";
import Figure from "react-bootstrap/Figure";
import ErrorBoundary from "../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../config";

const Slider = ({products, loading, errors}) => (
  <div className={styles.section}>
    <Container>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{clickable: true}}
      >
        {
          products.map((item, i) => (
            <SwiperSlide key={item.slug} style={{backgroundColor: 'black'}}>
              <div className={styles.item}>
                <Row xs={1} sm={2}>
                  <Col sm={{order: 2}}>
                    <Figure>
                      <Figure.Image
                        width={460}
                        src={process.env.PUBLIC_URL + "/img/products/nikon.png"}
                      />

                      {/*<ErrorBoundary>*/}
                      {/*  <IKImage*/}
                      {/*    // lqip={{ active: true }}*/}
                      {/*    urlEndpoint={images.urlEndpoint}*/}
                      {/*    path={item.images[0]}*/}
                      {/*    transformation={[{*/}
                      {/*      // height: 200,*/}
                      {/*      width: 460*/}
                      {/*    }]}/>*/}
                      {/*</ErrorBoundary>*/}

                    </Figure>
                  </Col>
                  <Col style={{position: 'relative'}}>
                    <div className={styles.itemSubTitle}>Year End</div>
                    <div className={styles.itemTitle}>Big sale!</div>
                    <div className={styles.itemText}>{item.title}</div>
                    <div className={styles.itemPriceWrap}>
                      <span className={styles.itemPrice}>${item.price}</span>
                      <span className={styles.itemSalePrice}>$320</span>
                    </div>
                    <Button className='c-button' as={Link} to={`${PRODUCT_ROUTE}/${item.slug}`}>Shop Now!</Button>
                  </Col>
                </Row>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </Container>
  </div>
);

export default Slider;
