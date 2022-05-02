import React from 'react';
import Form from "../form";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import {Link} from "react-router-dom";
import {REGISTER_ROUTE} from "../../utils/consts";
import styles from "../form/form.module.css";

const formFields = [
  {id: 'username', label: 'Username', type: 'text', name: 'username', placeholder: 'Username'},
  {id: 'password', label: 'Password', type: 'password', name: 'password', placeholder: 'Password'}
];

const formSubtitle = <>
  <span>Didn't have an account yet? </span>
  <Link to={REGISTER_ROUTE} className={styles.link}>Register&nbsp;Here</Link>
</>;

const Login = () => {
  return (
    <Form
      title='Welcome Back'
      subtitle={formSubtitle}
      fields={formFields}
      onSubmit={login}
    />
  );
};

export default connect(null, {login})(Login);

