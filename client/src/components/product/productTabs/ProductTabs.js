import React from 'react';
import styles from "./productTabs.module.css";
import {Col, Row, Tab} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const ProductTabs = () => {
  return (
    <div className={styles.main}>
      <Tab.Container defaultActiveKey="second">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                First
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                Second
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ProductTabs;
