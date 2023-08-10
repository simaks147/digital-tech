import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";
import Nav from 'react-bootstrap/Nav'
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";
import { activeNavSelector, categoriesListSelector } from "../../redux/selectors";
import { ReactComponent as CloseIcon } from "../../icons/close-icon.svg";
import { closeNav } from "../../redux/actions";
import useWindowSize from "../../hooks/use-window-size";
import { windowWidth } from "../../config";
import { CSSTransition } from "react-transition-group";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const CategoryList: FC<IProps> = ({ categories, activeNav, closeNav }) => {
  const { width } = useWindowSize();

  useEffect(() => {
    document.body.style.overflow = width! < windowWidth.lg && activeNav ? 'hidden' : 'visible';
  }, [activeNav, width]);

  if (width! < windowWidth.lg) return (
    <CSSTransition
      in={activeNav || width! >= windowWidth.lg}
      timeout={300}
      classNames='nav'
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.main}>
        <div className={styles.close} onClick={closeNav}>
          <CloseIcon />
        </div>
        <Nav className={styles.nav}>
          {
            categories.map((item) => <CategoryItem key={item.slug} item={item} />)
          }
        </Nav>
      </div>
    </CSSTransition>
  );

  return (
    <div className={styles.main}>
      <div className={styles.close} onClick={closeNav}>
        <CloseIcon />
      </div>
      <Nav className={styles.nav}>
        {
          categories.map((item) => <CategoryItem key={item.slug} item={item} />)
        }
      </Nav>
    </div>
  );
}

const mapStateToProps = (state: RootStateType) => ({
  categories: categoriesListSelector(state),
  activeNav: activeNavSelector(state)
});

const connector = connect(mapStateToProps, { closeNav });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CategoryList);
