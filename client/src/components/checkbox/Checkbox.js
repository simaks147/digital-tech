import React from 'react';
import cn from "classnames";
import styles from "./checkbox.module.css";
import {Form} from "react-bootstrap";
import {PropTypes as Types} from "prop-types";

const Checkbox = ({id, active, disabled, handleChange, children}) => (
  <Form.Check id={id} className={cn(styles.main, {active})}>
    <Form.Check.Input type="checkbox" className={styles.input} disabled={disabled}
                      onChange={handleChange} checked={active}/>
    <Form.Check.Label className={styles.label}>{children}</Form.Check.Label>
  </Form.Check>
);

Checkbox.propTypes = {
  id: Types.oneOfType([
    Types.string,
    Types.number
  ]).isRequired,
  active: Types.bool.isRequired,
  disabled: Types.bool.isRequired,
  handleChange: Types.func.isRequired,
  children: Types.node
};

export default Checkbox;
