import React from 'react';
import {Container, Row, Col } from "react-bootstrap";
import style from './app.module.scss';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div className={style.main}>
            <p className={style.second + ' mt-2'}><span className={style.second_small}>App </span>Working</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
