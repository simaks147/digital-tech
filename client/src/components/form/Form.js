import React, {useMemo, useState} from 'react';
import styles from './form.module.css';
import {Alert, Container, FloatingLabel, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import useForm from "../../hooks/use-form";
import {ReactComponent as GitHubIcon} from "../../icons/github.svg";
import {ReactComponent as YandexIcon} from "../../icons/yandex.svg";
import {ReactComponent as VKIcon} from "../../icons/vk.svg";
import {connect} from "react-redux";
import {oauth} from "../../redux/actions";
import Loader from "../loader";
import {PropTypes as Types} from "prop-types";

const social = [
  {provider: 'github', className: 'social-github', Icon: GitHubIcon},
  {provider: 'yandex', className: 'social-yandex', Icon: YandexIcon},
  {provider: 'vkontakte', className: 'social-vk', Icon: VKIcon}
];

const CustomForm = ({disabled, title, subtitle, fields, onSubmit, submitButton, errors, oauthAction}) => {
  const initialValues = useMemo(
    () => fields.reduce((acc, field) => ({...acc, [field.name]: ''}), {}),
    [fields]
  );
  const [validated, setValidated] = useState(false);
  const {values, handlers, reset} = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity()) onSubmit(values);

    setValidated(true);
    // reset();
  };

  return (
    <div className={styles.section}>
      <Container>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          {
            fields.map(field => {
              const {id, label, message, ...rest} = field;
              return (
                <FloatingLabel key={id} controlId={id} label={label}>
                  <Form.Control disabled={disabled}
                                {...rest}
                                {...handlers[id]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {message || 'Field must not be empty'}
                  </Form.Control.Feedback>
                </FloatingLabel>
              )
            })
          }
          {
            errors &&
            errors.map((err, i) => (
              <Alert variant="danger" key={i}>{err}</Alert>
            ))
          }
          <Button className='c-button' disabled={disabled} type='submit'>
            {disabled && <Loader/>}
            {submitButton}
          </Button>
        </Form>
        <div className={styles.or}>or</div>
        <div className={styles.social}>
          {
            social.map(({provider, className, Icon}) => (
              <a key={className} href="#" className={className} onClick={() => oauthAction(provider)}>
                <Icon/>
              </a>
            ))
          }
        </div>
      </Container>
    </div>
  );
};

CustomForm.propTypes = {
  disabled: Types.bool.isRequired,
  title: Types.oneOfType([
    Types.string,
    Types.element,
  ]),
  subtitle: Types.oneOfType([
    Types.string,
    Types.element,
  ]),
  fields: Types.arrayOf(Types.shape({
    id: Types.string.isRequired,
    name: Types.string.isRequired,
    label: Types.string,
    type: Types.string,
    placeholder: Types.string,
    maxLength: Types.number,
    required: Types.bool,
    message: Types.string,
    pattern:Types.string
  }).isRequired).isRequired,
  onSubmit: Types.func.isRequired,
  submitButton: Types.string,
  errors: Types.arrayOf(Types.string),
  oauthAction: Types.func.isRequired
};

export default connect(null, {oauthAction: oauth})(CustomForm);
