import React, {useMemo} from 'react';
import styles from "./productTabs.module.css";
import {Col, Row, Tab} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {ReactComponent as DescIcon} from '../../../icons/paper-icon.svg';
import {ReactComponent as SpecIcon} from '../../../icons/like-icon.svg';
import {ReactComponent as ReviewIcon} from '../../../icons/star-icon.svg';
import ProductSpec from "../productSpec";
import ProductReviews from "../productReviews";


const ProductTabs = ({product}) => {
  const TABS = useMemo(() => ([
    {title: 'Description', Icon: DescIcon, Pane: () => product.description},
    {title: 'Specification', Icon: SpecIcon, Pane: () => ProductSpec(product.specification)},
    {title: 'Reviews', Icon: ReviewIcon, Pane: ProductReviews}
  ]), [product]);

  return (
    <div className={styles.main}>
      <Tab.Container defaultActiveKey={TABS[0].title} unmountOnExit>
        <Row className='m-0'>
          <Col className='p-0' md={4} lg={3}>
            <Nav className="flex-column">
              {
                TABS.map(({title, Icon}) => (
                  <Nav.Item key={title}>
                    <Nav.Link eventKey={title}>
                      <Icon/>
                      <span className={styles.navText}>{title}</span>
                    </Nav.Link>
                  </Nav.Item>
                ))
              }
            </Nav>
          </Col>
          <Col className='p-0' md={8} lg={9}>
            <Tab.Content>
              {
                TABS.map(({title, Pane}) => (
                  <Tab.Pane key={title} eventKey={title}>
                    <Pane/>
                  </Tab.Pane>
                ))
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ProductTabs;
