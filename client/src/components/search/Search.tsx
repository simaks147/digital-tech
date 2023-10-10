import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form } from "react-bootstrap";
import styles from './search.module.css';
import { push } from "connected-react-router";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from 'redux';

const Search = ({ dispatch }: { dispatch: Dispatch }) => {
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
    <Form onSubmit={handleSubmit}>
      <Form.Control className={styles.search} type="text" placeholder="Search by keyword and press Enter" maxLength={100} value={searchValue} onChange={handleChange} />
    </Form>

  );
}

const connector = connect();

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Search);
