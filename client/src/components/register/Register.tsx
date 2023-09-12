import React, { FC } from 'react';
import Form from "../form";
import { connect, ConnectedProps } from "react-redux";
import { register } from "../../redux/actions";
import { Link, Redirect } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_FIELDS } from "../../utils/consts";
import { registrationSelector, tokenSelector } from "../../redux/selectors";
import styles from "./register.module.css";
import { Container } from "react-bootstrap";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const formSubtitle = <>
  <span>Already have an account? </span>
  <Link to={LOGIN_ROUTE}>Log&nbsp;In&nbsp;Here</Link>
</>;

const Register: FC<IProps> = ({ token, registration, registerAction }) => {
  if (registration.complete) {
    return (
      <div className={styles.section}>
        <Container>
          <h6>Congratulations, you are registered!</h6>
          {/*<div>An email has been sent to the email address you provided.</div>*/}
          {/*<div>To complete your registration, please follow the link in this email.</div>*/}
        </Container>
      </div>
    );
  }

  if (token) return <Redirect to={HOME_ROUTE} />;

  return (
    <Form
      disabled={registration.processing}
      title='Join With Us'
      subtitle={formSubtitle}
      fields={REGISTRATION_FIELDS}
      onSubmit={registerAction}
      submitButton='Register'
      errors={registration.error}
    />
  );
};

const mapStateToProps = (state: RootStateType) => ({
  token: tokenSelector(state),
  registration: registrationSelector(state)
});

const connector = connect(mapStateToProps, { registerAction: register });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapStateToProps, { registerAction: register })(Register);

