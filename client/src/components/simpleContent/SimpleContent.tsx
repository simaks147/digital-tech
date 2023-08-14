import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/consts";
import { Container } from "react-bootstrap";
import styles from "./simpleContent.module.css";

const SimpleContent = () => (
  <div className={styles.section}>
    <Container>
      <div className={styles.subTitle}>Oopss..</div>
      <div className={styles.title}>Page Cannot be Found</div>
      <div className={styles.text}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
        euismod
        tincidunt ut laoreet dolore magna aliquam erat volutpat.
      </div>
      {/* @ts-expect-error */}
      <Button as={Link} to={HOME_ROUTE} className='c-button'>Back to Home</Button>
    </Container>
  </div>
);

export default SimpleContent;
