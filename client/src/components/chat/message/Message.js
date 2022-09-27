import React from 'react';
import styles from "../chat.module.css";
import Card from "react-bootstrap/Card";
import formatMessageDate from "../../../utils/formatMessageDate";
import cn from "classnames";
import {PropTypes as Types} from 'prop-types';

const Message = ({msg}) => {
  const isAdminMessage = msg.user === 'admin';

  return (
    <Card
      className={cn(styles.msg, {out: isAdminMessage, in: !isAdminMessage}, {out: isAdminMessage, in: !isAdminMessage})}>
      <Card.Header>
        <span className={styles.msgUser}>{msg.user || 'anonymous'}:</span>
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

Message.propTypes = {
  msg: Types.shape({
    user: Types.string,
    date: Types.number.isRequired,
    text: Types.string
  })
};

export default Message;
