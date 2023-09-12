import React, { FC } from 'react';
import Form from "../form";
import { connect, ConnectedProps } from "react-redux";
import { login } from "../../redux/actions";
import { Link, Redirect } from "react-router-dom";
import { HOME_ROUTE, REGISTER_ROUTE, LOGIN_FIELDS } from "../../utils/consts";
import { tokenSelector, loginSelector } from "../../redux/selectors";
import { Alert } from "react-bootstrap";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const formSubtitle = <>
  <span>Didn't have an account yet? </span>
  <Link to={REGISTER_ROUTE}>Register&nbsp;Here</Link>
  <Alert variant="warning" className='mt-3'>Demo: user@mail.com / User123</Alert>
</>;

const Login: FC<IProps> = ({ token, login, loginAction }) => {
  if (token) return <Redirect to={HOME_ROUTE} />;

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

const mapStateToProps = (state: RootStateType) => ({
  token: tokenSelector(state),
  login: loginSelector(state)
});

const connector = connect(mapStateToProps, { loginAction: login });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Login);

