import React from 'react';
import styles from './productGrid.module.css';
import {Container} from "react-bootstrap";
import cn from "classnames";
import ErrorBoundary from "../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../config";
import Figure from "react-bootstrap/Figure";

const ProductGrid = () => (
    <div className={styles.section}>
      <Container>
        <div className={styles.main}>
          {/*<div className={cn(styles.item, styles.item_1)}>*/}
          {/*  <Figure>*/}
          {/*    <ErrorBoundary>*/}
          {/*      <IKImage*/}
          {/*        urlEndpoint={images.urlEndpoint}*/}
          {/*        path={product.sale.images[0] || images.defaultImage}*/}
          {/*        transformation={[{*/}
          {/*          // height: 200,*/}
          {/*          width: 460*/}
          {/*        }]}/>*/}
          {/*    </ErrorBoundary>*/}
          {/*  </Figure>*/}
          {/*</div>*/}

          <a href={'/'} className={cn(styles.item, styles.item_1)}>
            <Figure>
              <img src={process.env.PUBLIC_URL + 'img/slider/1.png'} alt=""/>
            </Figure>
            <div className={styles.content}>
              <div className={styles.title}>TVs & Entertainment</div>
              <div className={styles.subtitle}>Desktops & Workstations</div>
              <div className={styles.text}>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc.</div>
            </div>
          </a>

          <a href={'/'} className={cn(styles.item, styles.item_2)}>
            <Figure>
              <img src={process.env.PUBLIC_URL + 'img/slider/2.png'} alt=""/>
            </Figure>
            <div className={styles.content}>
              <div className={styles.title}>TVs & Entertainment</div>
              <div className={styles.subtitle}>Desktops & Workstations</div>
              <div className={styles.text}>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc.</div>
            </div>
          </a>

          <a href={'/'} className={cn(styles.item, styles.item_3)}>
            <Figure>
              <img src={process.env.PUBLIC_URL + 'img/slider/3.png'} alt=""/>
            </Figure>
            <div className={styles.content}>
              <div className={styles.title}>TVs & Entertainment</div>
              <div className={styles.subtitle}>Desktops & Workstations</div>
              <div className={styles.text}>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.</div>
            </div>
          </a>

          <a href={'/'} className={cn(styles.item, styles.item_4)}>
            <Figure>
              <img src={process.env.PUBLIC_URL + 'img/slider/4.png'} alt=""/>
            </Figure>
            <div className={styles.content}>
              <div className={styles.title}>TVs & Entertainment</div>
              <div className={styles.subtitle}>Desktops & Workstations</div>
              <div className={styles.text}>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.</div>
            </div>
          </a>

          <a href={'/'} className={cn(styles.item, styles.item_5)}>
            <Figure>
              <img src={process.env.PUBLIC_URL + 'img/slider/5.png'} alt=""/>
            </Figure>
            <div className={styles.content}>
              <div className={styles.title}>TVs & Entertainment</div>
              <div className={styles.subtitle}>Desktops & Workstations</div>
              <div className={styles.text}>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.</div>
            </div>
          </a>

        </div>
      </Container>
    </div>
  );


export default ProductGrid;
