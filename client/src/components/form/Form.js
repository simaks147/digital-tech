import React, {useMemo} from 'react';
import styles from './form.module.css';
import {Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import useForm from "../../hooks/use-form";

const CustomForm = ({title, subtitle, fields, onSubmit}) => {
  const initialValues = useMemo(
    () => fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {}),
    [fields]
  );

  const {values, handlers, reset} = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    reset();
    onSubmit(values);
  };

  return (
    <div className={styles.section}>
      <Container>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        <Form>
          {
            fields.map(field => (
              <FloatingLabel key={field.id} controlId={field.id} label={field.label}>
                <Form.Control type={field.type} name={field.name} placeholder={field.placeholder} {...handlers[field.name]}/>
              </FloatingLabel>
            ))
          }
        </Form>
        <Button className='c-button' onClick={handleSubmit}>Log In</Button>
      </Container>
    </div>
  );
};

export default CustomForm;
