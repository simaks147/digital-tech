import React from 'react';
import {Container} from "react-bootstrap";
import styles from './footer.module.css';
import Logo from "../logo";

const Footer = () => {
  return (
    <div className={styles.section}>
      <Container className='d-flex flex-column align-items-center'>
        <Logo/>
        <div className={styles.address}>77 Freestone, Largepoint, London, 777777</div>
        <div>
          <a className={styles.phone} href='tel:(777) 777-7777'>(777) 777-7777</a>
          <a className={styles.email} href="mailto:mail@digitaltech.com">mail@digitaltech.com</a>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
