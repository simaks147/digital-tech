import React from 'react';
import Form from "../form";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import {Link, Redirect} from "react-router-dom";
import {HOME_ROUTE, REGISTER_ROUTE} from "../../utils/consts";
import styles from "../form/form.module.css";
import {tokenSelector, loginSelector} from "../../redux/selectors";

const formFields = [
  {id: 'email', label: 'Email', type: 'text', name: 'email', placeholder: 'Email'},
  {id: 'password', label: 'Password', type: 'password', name: 'password', placeholder: 'Password'}
];

const formSubtitle = <>
  <span>Didn't have an account yet? </span>
  <Link to={REGISTER_ROUTE} className={styles.link}>Register&nbsp;Here</Link>
</>;

const Login = ({token, login, loginAction}) => {
  if (token) return <Redirect to={HOME_ROUTE}/>;

  return (
    <Form
      disabled={login.processing}
      title='Welcome Back'
      subtitle={formSubtitle}
      fields={formFields}
      onSubmit={loginAction}
      submitButton='Log In'
      errors={login.error}
    />
  );
};

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props),
  login: loginSelector(state, props)
});

export default connect(mapStateToProps,{loginAction: login})(Login);

