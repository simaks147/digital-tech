import React from 'react';
import {Col, Container, Row, Form} from "react-bootstrap";
import Basket from "../basket";
import styles from './mainBar.module.css';


const MainBar = () => {
  return (
    <div className={styles.section}>
      <Container>
        <Row className={'justify-content-between align-items-center'}>
          <Col xs={'auto'}>
            <div className={styles.brand}>DigitalTech</div>
          </Col>
          <Col xs={'auto'} md={{order: 3}}>
            <Basket className={styles.basket}/>
          </Col>
          <Col xs={12} md>
            <Form.Control className={styles.search} type="text" placeholder="Search by keyword and press Enter" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainBar;
