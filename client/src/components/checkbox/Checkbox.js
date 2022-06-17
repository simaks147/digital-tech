import React from 'react';
import cn from "classnames";
import styles from "./checkbox.module.css";
import {Form} from "react-bootstrap";

const Checkbox = ({id, active, disabled, onChange, labelText}) => {
  return (
    <Form.Check id={id} className={cn(styles.main, {active})}>
      <Form.Check.Input type="checkbox" className={styles.input} disabled={disabled}
                        onChange={() => onChange(!active)} checked={active}/>
      <Form.Check.Label className={styles.label}>{labelText}</Form.Check.Label>
    </Form.Check>
  );
};

export default Checkbox;
