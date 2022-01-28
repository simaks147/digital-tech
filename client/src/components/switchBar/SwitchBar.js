import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import styles from './switchBar.module.css';
import LangBar from "../langBar";

const SwitchBar = () => (
  <div className={styles.section}>
    <Container>
      <Row className={'justify-content-between align-items-center'}>
        <Col xs={1}>
          <LangBar/>
        </Col>
        <Col xs={2}>
          <a href="#">Sign In</a> or <a href="#">Sign Up</a>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SwitchBar;
