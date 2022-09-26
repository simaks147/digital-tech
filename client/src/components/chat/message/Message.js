import React from 'react';
import styles from "../chat.module.css";
import {Card} from "react-bootstrap";
import formatMessageDate from "../../../utils/formatMessageDate";

const Message = ({msg}) => (
  <Card>
    <Card.Body>
      <Card.Title>
        <span className={styles.msgUser}>{msg.user}</span>
        <span className={styles.msgDate}>{formatMessageDate(msg.date)}</span>
      </Card.Title>
      <Card.Text>
        {msg.text}
      </Card.Text>
    </Card.Body>
  </Card>
  // <div className={styles.msg}>
  //   <div className={styles.msgDate}>{msg.date}</div>
  //   <div className={styles.msgUser}>{msg.user}</div>
  //   <div className={styles.msgText}>{msg.text}</div>
  // </div>
);

export default Message;
