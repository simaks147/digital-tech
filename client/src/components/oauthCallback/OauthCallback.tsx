import React, { FC, useEffect } from 'react';
import { tokenSelector, oauthCallbackSelector } from "../../redux/selectors";
import { oauthCallback } from "../../redux/actions";
import { connect, ConnectedProps } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import styles from './oauthCallback.module.css';
import { Alert, Container } from "react-bootstrap";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import Loader from "../loader";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const OauthCallback: FC<IProps> = ({ token, oauthCallback, oauthCallbackAction }) => {
  const provider = useParams<{ provider: string }>().provider;
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (params.get('error') || token) return;
    oauthCallbackAction(provider, params.get('code')!);
  }, []);

  if (token) return <Redirect to={HOME_ROUTE} />;

  return (
    <div className={styles.section}>
      <Container>
        <h6>Login via <b>{provider}</b> ...</h6>
        {
          (params.get('error') || oauthCallback.error || !params.get('code'))
            ?
            <>
              {
                oauthCallback.error &&
                oauthCallback.error.map((err, i) => (
                  <Alert variant="danger" key={i}>{err}</Alert>
                ))
              }
              <Link to={LOGIN_ROUTE}>Log&nbsp;In</Link>
            </>
            :
            <Loader />
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  oauthCallback: oauthCallbackSelector(state),
  token: tokenSelector(state)
});

const connector = connect(mapStateToProps, { oauthCallbackAction: oauthCallback });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(OauthCallback);

