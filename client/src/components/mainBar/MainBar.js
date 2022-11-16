import React, {useState} from 'react';
import {Col, Container, Row, Form} from "react-bootstrap";
import Cart from "../cart";
import styles from './mainBar.module.css';
import Logo from "../logo";
import {push} from "connected-react-router";
import {connect} from "react-redux";

const MainBar = ({dispatch}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(push(`/search?query=${encodeURIComponent(searchValue)}`));
    setSearchValue('');
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value)
  };

  return (
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
            <Form onSubmit={handleSubmit}>
              <Form.Control className={styles.search} type="text" placeholder="Search by keyword and press Enter" value={searchValue} onChange={handleChange}/>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default connect()(MainBar);
