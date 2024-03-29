import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import styles from './switchBar.module.css';
import {Link} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE} from "../../utils/consts";
import {dataProfileSelector, tokenSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import logout from "../../utils/logout";
import Currency from "../currency";
import {ReactComponent as MenuIcon} from "../../icons/menu-icon.svg";
import {openNav} from "../../redux/actions";
import {PropTypes as Types} from "prop-types";

const SwitchBar = ({token, dataProfile, openNav}) => (
  <div className={styles.section}>
    {
      !!dataProfile.isAdmin &&
      <div className={styles.admin}>
        <Link to={ADMIN_ROUTE}>Admin</Link>
      </div>
    }
    <Container>
      <Row className="justify-content-between align-items-center">
        <Col xs={6} lg={1} className="d-flex align-items-center">
          <div className={styles.menuIcon} onClick={openNav}>
            <MenuIcon/>
          </div>
          <Currency/>
        </Col>
        <Col xs={6} lg={3} style={{textAlign: "right"}}>
          {
            !token
              ?
              <>
                <Link to={LOGIN_ROUTE} className={styles.link}>Log&nbsp;In</Link>
                <span className={styles.or}> or </span>
                <Link to={REGISTER_ROUTE} className={styles.link}>Sign&nbsp;Up</Link>
              </>
              :
              <>
                <div className={styles.hello}>Hello,&nbsp;<span>{dataProfile.displayName?.split(' ')[0]}</span></div>
                <a onClick={logout} className={styles.link}>Log&nbsp;Out</a>
              </>
          }
        </Col>
      </Row>
    </Container>
  </div>
);

SwitchBar.propTypes = {
  token: Types.string,
  dataProfile: Types.shape({
    isAdmin: Types.bool.isRequired
  }).isRequired,
  openNav: Types.func.isRequired
};

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props),
  dataProfile: dataProfileSelector(state)
});

export default connect(mapStateToProps, {openNav})(SwitchBar);
