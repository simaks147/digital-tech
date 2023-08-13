import React, { FC } from 'react';
import styles from './subcategoriesGrid.module.css';
import { Container } from "react-bootstrap";
import cn from "classnames";
import ErrorBoundary from "../ErrorBoundary";
import { IKImage } from "imagekitio-react";
import { images } from "../../config";
import Figure from "react-bootstrap/Figure";
import { connect, ConnectedProps } from "react-redux";
import { randomSubcategoriesSelector } from "../../redux/selectors";
import { CATEGORY_ROUTE } from "../../utils/consts";
import { Link } from "react-router-dom";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const SubcategoriesGrid: FC<IProps> = ({ subcategories }) => (
  <div className={styles.section}>
    <Container>
      <div className={styles.main}>
        {
          subcategories.map((item, i) => (
            <Link to={`${CATEGORY_ROUTE}/${item.slug}`} key={item.slug} className={cn(styles.item, styles[`item_${i + 1}`])}>
              <Figure>
                <ErrorBoundary>
                  {/* @ts-expect-error IKImage */}
                  <IKImage
                    lqip={{ active: true }}
                    urlEndpoint={images.urlEndpoint}
                    path={item.img || images.defaultImage}
                    transformation={[{
                      // height: 200,
                      width: '316'
                    }]} />
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

const mapStateToProps = (state: RootStateType) => ({
  subcategories: randomSubcategoriesSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SubcategoriesGrid);
