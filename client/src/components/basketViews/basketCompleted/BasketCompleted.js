import React from 'react';
import styles from "./basketCompleted.module.css";
import {Alert, Container} from "react-bootstrap";
import {ReactComponent as Icon} from '../../../icons/cart-icon-succes.svg';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {HOME_ROUTE} from "../../../utils/consts";
import {connect} from "react-redux";
import {messageOrderSelector} from "../../../redux/selectors";

const BasketCompleted = ({message}) => (
  <div className={styles.section}>
    <Container>
      <Icon/>
      <div className={styles.title}>thank you!</div>
      {
        !!message ?
          <Alert variant="warning">{message}</Alert> :
          <div className={styles.text}>You will receive e-mail confirmation. <br></br> Let's looks our recommended items
          </div>
      }
      <Button className='c-button' as={Link} to={HOME_ROUTE}>Continue Shopping</Button>
    </Container>
  </div>
);

const mapStateToProps = (state, props) => ({
  message: messageOrderSelector(state, props)
});

export default connect(mapStateToProps)(BasketCompleted);
