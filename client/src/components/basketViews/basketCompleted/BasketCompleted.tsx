import React, { FC } from 'react';
import styles from "./basketCompleted.module.css";
import { Alert, Container } from "react-bootstrap";
import { ReactComponent as Icon } from '../../../icons/cart-icon-succes.svg';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { HOME_ROUTE } from "../../../utils/consts";
import { connect, ConnectedProps } from "react-redux";
import { messageOrderSelector } from "../../../redux/selectors";
import { RootStateType } from '../../../redux/store';

interface IProps extends PropsFromRedux { }

const BasketCompleted: FC<IProps> = ({ message }) => (
  <div className={styles.section}>
    <Container>
      <Icon />
      <div className={styles.title}>thank you!</div>
      {
        !!message ?
          <Alert variant="warning">{message}</Alert> :
          <div className={styles.text}>You will receive e-mail confirmation. <br></br> Let's looks our recommended items
          </div>
      }
      {/* @ts-expect-error */}
      <Button className='c-button' as={Link} to={HOME_ROUTE}>Continue Shopping</Button>
    </Container>
  </div>
);

const mapStateToProps = (state: RootStateType) => ({
  message: messageOrderSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BasketCompleted);
