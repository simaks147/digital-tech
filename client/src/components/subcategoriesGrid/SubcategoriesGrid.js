import React from 'react';
import styles from './subcategoriesGrid.module.css';
import {Container} from "react-bootstrap";
import cn from "classnames";
import ErrorBoundary from "../ErrorBoundary";
import {IKImage} from "imagekitio-react";
import {images} from "../../config";
import Figure from "react-bootstrap/Figure";
import {connect} from "react-redux";
import {randomSubcategoriesSelector} from "../../redux/selectors";
import {CATEGORY_ROUTE} from "../../utils/consts";
import {Link} from "react-router-dom";
import {PropTypes as Types} from "prop-types";

const SubcategoriesGrid = ({subcategories}) => (
  <div className={styles.section}>
    <Container>
      <div className={styles.main}>
        {
          subcategories.map((item, i) => (
            <Link to={`${CATEGORY_ROUTE}/${item.slug}`} key={item.slug} className={cn(styles.item, styles[`item_${i + 1}`])}>
              <Figure>
                <ErrorBoundary>
                  <IKImage
                    lqip={{active: true}}
                    urlEndpoint={images.urlEndpoint}
                    path={item.img || images.defaultImage}
                    transformation={[{
                      // height: 200,
                      width: 316
                    }]}/>
                </ErrorBoundary>
              </Figure>
              <div className={styles.content}>
                <div className={styles.title}>{item.parentTitle}</div>
                <div className={styles.subtitle}>{item.title}</div>
                <div className={styles.text}>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc.
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </Container>
  </div>
);

SubcategoriesGrid.propTypes = {
  subcategories: Types.arrayOf(Types.shape({
    slug: Types.string.isRequired,
    title: Types.string,
    parentTitle: Types.string,
    img: Types.string
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  subcategories: randomSubcategoriesSelector(state)
});

export default connect(mapStateToProps)(SubcategoriesGrid);
