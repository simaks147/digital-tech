import React, { FC, useEffect } from 'react';
import { tokenSelector, confirmationSelector } from "../../redux/selectors";
import { confirm } from "../../redux/actions";
import { connect, ConnectedProps } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import styles from './confirm.module.css';
import { Alert, Container } from "react-bootstrap";
import { HOME_ROUTE, REGISTER_ROUTE } from "../../utils/consts";
import Loader from "../loader";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const Confirm: FC<IProps> = ({ token, confirmation, confirmAction }) => {
  const verificationToken = useParams<{ verificationToken: string }>().verificationToken;

  useEffect(() => {
    confirmAction(verificationToken);
  }, []);

  if (token) return <Redirect to={HOME_ROUTE} />;

  return (
    <div className={styles.section}>
      <Container>
        <h6>Email confirmation ...</h6>
        {
          confirmation.error
            ?
            <>
              {
                confirmation.error.map((err) => (
                  <Alert variant="danger">{err}</Alert>
                ))
              }
              <Link to={REGISTER_ROUTE}>Sign&nbsp;Up</Link>
            </>
            :
            <Loader />
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  confirmation: confirmationSelector(state),
  token: tokenSelector(state)
});

const connector = connect(mapStateToProps, { confirmAction: confirm });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Confirm);

