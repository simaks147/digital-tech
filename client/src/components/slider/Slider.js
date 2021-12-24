import React from 'react';
import {Button, Carousel, Container} from "react-bootstrap";
import fixtures from "./fixtures";
import './Slider.scss'

const Slider = () => {
  return (
    <div>
      <Container>
        <Carousel className='c-slider' wrap={false}>
          {
            fixtures.map(item => (
              <Carousel.Item key={item.id} className='c-slider__item' style={{backgroundColor: item.bg}}>
                <div className="c-slider__item-sub-title">{item.subTitle}</div>
                <div className="c-slider__item-title">{item.title}</div>
                <div className="c-slider__item-text">{item.text}</div>
                <Button className="c-slider__item-button">Shop Now!</Button>
                {/*<img src={item.img} alt=""/>*/}
              </Carousel.Item>
            ))
          }
        </Carousel>
      </Container>
    </div>
  );
};

export default Slider;
