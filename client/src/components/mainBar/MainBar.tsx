import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Cart from "../cart";
import styles from './mainBar.module.css';
import Logo from "../logo";
import Search from '../search/Search';

const MainBar = () => {
  return (
    <div className={styles.section}>
      <Container>
        <Row className={'justify-content-between align-items-center'}>
          <Col xs={'auto'}>
            <Logo />
          </Col>
          <Col xs={'auto'} md={{ order: 3 }}>
            <Cart />
          </Col>
          <Col xs={12} md>
            <Search />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainBar;
