import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Nav from 'react-bootstrap/Nav'
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";
import {activeNavSelector, categoriesListSelector} from "../../redux/selectors";
import {ReactComponent as CloseIcon} from "../../icons/close-icon.svg";
import {closeNav} from "../../redux/actions";
import useWindowSize from "../../hooks/use-window-size";
import {windowWidth} from "../../config";
import {CSSTransition} from "react-transition-group";

const CategoryList = ({categories, activeNav, closeNav}) => {
  const {width} = useWindowSize();

  useEffect(() => {
    document.body.style.overflow = width < windowWidth.lg && activeNav ? 'hidden' : 'visible';
  }, [activeNav, width]);

  if (width < windowWidth.lg) return (
    <CSSTransition
      in={activeNav || width >= windowWidth.lg}
      timeout={300}
      classNames='nav'
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.main}>
        <div className={styles.close} onClick={closeNav}>
          <CloseIcon/>
        </div>
        <Nav className={styles.nav}>
          {
            categories.map((item) => <CategoryItem key={item.slug} item={item}/>)
          }
        </Nav>
      </div>
    </CSSTransition>
  );

  return (
      <div className={styles.main}>
        <div className={styles.close} onClick={closeNav}>
          <CloseIcon/>
        </div>
        <Nav className={styles.nav}>
          {
            categories.map((item) => <CategoryItem key={item.slug} item={item}/>)
          }
        </Nav>
      </div>
  );
}

const mapStateToProps = (state) => ({
  categories: categoriesListSelector(state),
  activeNav: activeNavSelector(state)
});

export default connect(mapStateToProps, {closeNav})(CategoryList);
