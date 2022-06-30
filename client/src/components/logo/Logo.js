import React from 'react';
import styles from './logo.module.css';
import {HOME_ROUTE} from "../../utils/consts";
import {Link} from "react-router-dom";

const Logo = () => (
  <Link to={HOME_ROUTE} className={styles.main}>DigitalTech</Link>
);

export default Logo;
