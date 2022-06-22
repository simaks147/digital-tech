import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Nav from 'react-bootstrap/Nav'
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";
import {activeNavSelector, categoriesListSelector} from "../../redux/selectors";
import {ReactComponent as CloseIcon} from "../../icons/close-icon.svg";
import {closeNav} from "../../redux/actions";
import cn from "classnames";

const CategoryList = ({categories, activeNav, closeNav}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
      document.body.style.overflow = (windowWidth < 992) && activeNav ? 'hidden' : 'visible';
  }, [activeNav, windowWidth]);

  return (
    <div className={cn(styles.main, {active: activeNav})}>
      <div className={styles.close} onClick={closeNav}>
        <CloseIcon/>
      </div>
      <Nav className={styles.nav}>
        {
          categories.map((item, i) => <CategoryItem key={item.slug} item={item}/>)
        }
      </Nav>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state),
  activeNav: activeNavSelector(state)
});

export default connect(mapStateToProps, {closeNav})(CategoryList);
