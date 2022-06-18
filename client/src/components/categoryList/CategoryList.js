import React from 'react';
import {connect} from "react-redux";
import Nav from 'react-bootstrap/Nav'
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";
import {categoriesListSelector} from "../../redux/selectors";

const CategoryList = ({categories}) => (
  <div className={styles.main}>
    <div className={styles.close}></div>
    <Nav className={styles.nav}>
      {
        categories.map((item, i) => <CategoryItem key={item.slug} item={item}/>)
      }
    </Nav>
  </div>
);

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state),
});

export default connect(mapStateToProps)(CategoryList);
