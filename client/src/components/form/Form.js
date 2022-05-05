import React, {useMemo} from 'react';
import styles from './form.module.css';
import {Alert, Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import useForm from "../../hooks/use-form";
import Spinner from "react-bootstrap/Spinner";
import {ReactComponent as GitHubIcon} from "../../icons/github.svg";
import {ReactComponent as YandexIcon} from "../../icons/yandex.svg";
import {ReactComponent as VKIcon} from "../../icons/vk.svg";

const social = [
  {className: 'social-github', Icon: GitHubIcon},
  {className: 'social-yandex', Icon: YandexIcon},
  {className: 'social-vk', Icon: VKIcon}
];

const CustomForm = ({disabled, title, subtitle, fields, onSubmit, submitButton, errors}) => {
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
                <Form.Control type={field.type} name={field.name}
                              placeholder={field.placeholder} {...handlers[field.name]} disabled={disabled}/>
              </FloatingLabel>
            ))
          }
          {
            errors &&
            <Alert variant="danger">{errors?.error.message}</Alert>
          }
        </Form>
        <Button className='c-button' onClick={handleSubmit} disabled={disabled}>
          {
            disabled &&
            <Spinner animation="border" role="status" className='c-loader'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          {submitButton}
        </Button>
        <div className={styles.or}>or</div>
        <div className={styles.social}>
          {
            social.map(({className, Icon}) => (
              <a key={className} href="#" className={className}>
                <Icon/>
              </a>
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default CustomForm;
