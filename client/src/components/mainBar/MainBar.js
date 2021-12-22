import React from 'react';
import {Col, Container, Row, Form} from "react-bootstrap";
import Basket from "../basket";
import './mainBar.scss';


const MainBar = () => {
  return (
    <div className={'c-main-bar'}>
      <Container>
        <Row className={'justify-content-between align-items-center'}>
          <Col xs={'auto'}>
            <div className={'c-main-bar__brand'}>DigitalTech</div>
          </Col>
          <Col xs={'auto'} md={{order: 3}}>
            <Basket className={'c-main-bar__basket'}/>
          </Col>
          <Col xs={12} md>
            <Form.Control className={'c-main-bar__search'} type="text" placeholder="Search by keyword and press Enter" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainBar;
