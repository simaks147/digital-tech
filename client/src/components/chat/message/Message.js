import React from 'react';
import styles from "../chat.module.css";
import Card from "react-bootstrap/Card";
import formatMessageDate from "../../../utils/formatMessageDate";
import cn from "classnames";

const Message = ({msg}) => {
  const isAdminMessage = msg.user === 'admin';

  return (
    <Card
      className={cn(styles.msg, {out: isAdminMessage, in: !isAdminMessage}, {out: isAdminMessage, in: !isAdminMessage})}>
      <Card.Header>
        <span className={styles.msgUser}>{msg.user}</span>
        <span className={styles.msgDate}>{formatMessageDate(msg.date)}</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {msg.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Message;
