import React, { ChangeEvent, FC, FormEvent, FormEventHandler, useState } from 'react';
import { Col, Container, Row, Form } from "react-bootstrap";
import Cart from "../cart";
import styles from './mainBar.module.css';
import Logo from "../logo";
import { push } from "connected-react-router";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from 'redux';

const MainBar = ({ dispatch }: { dispatch: Dispatch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(push(`/search?query=${encodeURIComponent(searchValue.trim())}`));
    setSearchValue('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  };

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
            <Form onSubmit={handleSubmit}>
              <Form.Control className={styles.search} type="text" placeholder="Search by keyword and press Enter" maxLength={100} value={searchValue} onChange={handleChange} />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(MainBar);
