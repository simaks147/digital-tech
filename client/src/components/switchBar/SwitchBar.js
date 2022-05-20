import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import styles from './switchBar.module.css';
import LangBar from "../langBar";
import {Link} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE, HOME_ROUTE} from "../../utils/consts";
import {tokenSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import logout from "../../utils/logout";

const SwitchBar = ({token}) => (
  <div className={styles.section}>
    <Container>
      <Row className={'justify-content-between align-items-center'}>
        <Col xs={6} lg={1}>
          <LangBar/>
        </Col>
        <Col xs={6} lg={2} style={{textAlign: "right"}}>
          {
            !token
              ?
              <>
                <Link to={LOGIN_ROUTE} className={styles.link}>Log&nbsp;In</Link>
                <span> or </span>
                <Link to={REGISTER_ROUTE} className={styles.link}>Sign&nbsp;Up</Link>
              </>
              :
              <a onClick={logout} className={styles.link}>Log&nbsp;Out</a>
          }
        </Col>
      </Row>
    </Container>
  </div>
);

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props),
});

export default connect(mapStateToProps)(SwitchBar);
