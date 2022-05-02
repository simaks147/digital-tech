import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import styles from './switchBar.module.css';
import LangBar from "../langBar";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "../../utils/consts";

const SwitchBar = () => (
  <div className={styles.section}>
    <Container>
      <Row className={'justify-content-between align-items-center'}>
        <Col xs={6} lg={1}>
          <LangBar/>
        </Col>
        <Col xs={6} lg={2} style={{textAlign: "right"}}>
          <Link to={LOGIN_ROUTE} className={styles.link}>Log&nbsp;In</Link>
          <span> or </span>
          <Link to={REGISTER_ROUTE} className={styles.link}>Sign&nbsp;Up</Link>
        </Col>
      </Row>
    </Container>
  </div>
);

export default SwitchBar;
