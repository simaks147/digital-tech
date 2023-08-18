import React, { ChangeEventHandler, FC, ReactNode } from 'react';
import cn from "classnames";
import styles from "./checkbox.module.css";
import { Form } from "react-bootstrap";

interface IProps {
  id: string,
  active: boolean,
  disabled: boolean,
  handleChange: ChangeEventHandler<HTMLInputElement>,
  children: ReactNode
}

const Checkbox: FC<IProps> = ({ id, active, disabled, handleChange, children }) => (
  <Form.Check id={id} className={cn(styles.main, { active })}>
    <Form.Check.Input type="checkbox" className={styles.input} disabled={disabled}
      onChange={handleChange} checked={active} />
    <Form.Check.Label className={styles.label}>{children}</Form.Check.Label>
  </Form.Check>
);

export default Checkbox;
