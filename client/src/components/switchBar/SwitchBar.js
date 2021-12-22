import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import './switchBar.scss';
import LangBar from "../langBar";

const SwitchBar = () => {
  return (
    <div className="c-switch-bar">
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
};

export default SwitchBar;
