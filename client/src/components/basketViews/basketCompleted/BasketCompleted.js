import React from 'react';
import styles from "./basketCompleted.module.css";
import {Container} from "react-bootstrap";
import {ReactComponent as Icon} from '../../../icons/cart-icon-succes.svg';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {HOME_ROUTE} from "../../../utils/consts";


const BasketCompleted = () => (
  <div className={styles.section}>
    <Container>
      <Icon/>
      <div className={styles.title}>thank you!</div>
      <div className={styles.text}>Let's looks our recommended items</div>
      <Button className='c-button' as={Link} to={HOME_ROUTE}>Continue Shopping</Button>
    </Container>
  </div>
);

export default BasketCompleted;
