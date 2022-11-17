import React from 'react';
import Form from "../form";
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import {Link, Redirect} from "react-router-dom";
import {HOME_ROUTE, REGISTER_ROUTE, LOGIN_FIELDS} from "../../utils/consts";
import styles from "../form/form.module.css";
import {tokenSelector, loginSelector} from "../../redux/selectors";
import {PropTypes as Types} from "prop-types";
import {Alert} from "react-bootstrap";

const formSubtitle = <>
  <span>Didn't have an account yet? </span>
  <Link to={REGISTER_ROUTE} className={styles.link}>Register&nbsp;Here</Link>
  <Alert variant="warning" className='mt-3'>Demo: user@mail.com / User123</Alert>
</>;

const Login = ({token, login, loginAction}) => {
  if (token) return <Redirect to={HOME_ROUTE}/>;

  return (
    <Form
      disabled={login.processing}
      title='Welcome Back'
      subtitle={formSubtitle}
      fields={LOGIN_FIELDS}
      onSubmit={loginAction}
      submitButton='Log In'
      errors={login.error}
    />
  );
};

Login.propTypes = {
  token: Types.string,
  loginAction: Types.func.isRequired,
  login: Types.shape({
    processing: Types.bool.isRequired,
    error: Types.arrayOf(Types.string)
  }).isRequired
};

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props),
  login: loginSelector(state, props)
});

export default connect(mapStateToProps, {loginAction: login})(Login);

