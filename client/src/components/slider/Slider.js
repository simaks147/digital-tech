import React from 'react';
import {Button, Carousel, Container} from "react-bootstrap";
import {sliders} from "../../fixtures";
import styles from './slider.module.css'

const Slider = () => (
  <div>
    <Container>
      <Carousel className={styles.section} wrap={false}>
        {
          sliders.map(item => (
            <Carousel.Item key={item.id} className={styles.item} style={{backgroundColor: item.bg}}>
              <div className={styles.itemSubTitle}>{item.subTitle}</div>
              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.itemText}>{item.text}</div>
              <Button className={styles.itemButton}>Shop Now!</Button>
              {/*<img src={item.img} alt=""/>*/}
            </Carousel.Item>
          ))
        }
      </Carousel>
    </Container>
  </div>
);

export default Slider;
