import React, {useEffect} from 'react';
import {tokenSelector, oauthCallbackSelector} from "../../redux/selectors";
import {oauthCallback} from "../../redux/actions";
import {connect} from "react-redux";
import {Link, Redirect, useParams} from "react-router-dom";
import styles from './oauthCallback.module.css';
import {Alert, Container} from "react-bootstrap";
import {HOME_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import Loader from "../loader";

const OauthCallback = ({token, oauthCallback, oauthCallbackAction}) => {
  const provider = useParams().provider;
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (params.get('error') || token) return;
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
            <Loader/>
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

