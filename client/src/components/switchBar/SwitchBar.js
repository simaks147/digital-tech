import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import './switchBar.scss';
import LangBar from "../langBar";

const SwitchBar = () => {


  return (
    <Container>
      <Row>
        <Col>
          <LangBar/>
        </Col>
      </Row>
    </Container>
  );
};

export default SwitchBar;
