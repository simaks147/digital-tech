import React from 'react';
import {Alert, Button, Col, Container, Row} from "react-bootstrap";
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
import Loader from "../loader";

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
          products.map(item => (
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
                    <div className={styles.itemSubTitle}>{item.saleSubtitle}</div>
                    <div className={styles.itemTitle}>{item.saleTitle}</div>
                    <div className={styles.itemText}>{item.title}</div>
                    <div className={styles.itemPriceWrap}>
                      <span className={styles.itemPrice}>${item.price}</span>
                      <span className={styles.itemSalePrice}>${item.price - Math.floor((item.price / 100) * item.discountPercent)}</span>
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
