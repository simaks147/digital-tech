import React, {useEffect} from 'react';
import {tokenSelector, oauthCallbackSelector} from "../../redux/selectors";
import {oauthCallback} from "../../redux/actions";
import {connect} from "react-redux";
import {Link, Redirect, useParams} from "react-router-dom";
import styles from './oauthCallback.module.css';
import {Alert, Container} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts";

const OauthCallback = ({token, oauthCallback, oauthCallbackAction}) => {
  const provider = useParams().provider;
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (params.get('error')) return;
    oauthCallbackAction(provider, params.get('code'));
  }, []);

  if (token) return <Redirect to={HOME_ROUTE}/>;

  return (
    <div className={styles.section}>
      <Container>
        <h6>Login via <b>{provider}</b> ...</h6>
        {
          (params.get('error') || oauthCallback.error || !params.get('code'))
            ?
            <>
              <Alert variant="danger">An error occurred while performing the operation</Alert>
              {
                oauthCallback.error &&
                oauthCallback.error.map((err) => (
                  <Alert variant="danger">{err}</Alert>
                ))
              }
              <Link to={LOGIN_ROUTE}>Log&nbsp;In</Link>
            </>
            :
            <Spinner animation="border" role="status" className='c-loader'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  oauthCallback: oauthCallbackSelector(state, props),
  token: tokenSelector(state, props)
});

export default connect(mapStateToProps, {oauthCallbackAction: oauthCallback})(OauthCallback);

