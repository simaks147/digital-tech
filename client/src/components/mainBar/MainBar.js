import React from 'react';
import {Col, Container, Row, Form} from "react-bootstrap";
import Cart from "../cart";
import styles from './mainBar.module.css';
import Logo from "../logo";

const MainBar = () => (
  <div className={styles.section}>
    <Container>
      <Row className={'justify-content-between align-items-center'}>
        <Col xs={'auto'}>
          <Logo/>
        </Col>
        <Col xs={'auto'} md={{order: 3}}>
          <Cart/>
        </Col>
        <Col xs={12} md>
          <Form.Control className={styles.search} type="text" placeholder="Search by keyword and press Enter"/>
        </Col>
      </Row>
    </Container>
  </div>
);

export default MainBar;
