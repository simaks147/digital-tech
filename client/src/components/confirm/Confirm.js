import React, {useEffect} from 'react';
import {tokenSelector, confirmationSelector} from "../../redux/selectors";
import {confirm} from "../../redux/actions";
import {connect} from "react-redux";
import {Link, Redirect, useParams} from "react-router-dom";
import styles from './confirm.module.css';
import {Alert, Container} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import {HOME_ROUTE, REGISTER_ROUTE} from "../../utils/consts";

const Confirm = ({token, confirmation, confirmAction}) => {
  const verificationToken = useParams().verificationToken;

  useEffect(() => {
    confirmAction(verificationToken);
  }, []);

  if (token) return <Redirect to={HOME_ROUTE}/>;

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
            <Spinner animation="border" role="status" className='c-loader'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  confirmation: confirmationSelector(state, props),
  token: tokenSelector(state, props)
});

export default connect(mapStateToProps, {confirmAction: confirm})(Confirm);

