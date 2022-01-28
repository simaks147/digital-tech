import React from 'react';
import {connect} from "react-redux";
import {Nav} from "react-bootstrap";
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";
import {categoriesListSelector} from "../../redux/selectors";

const CategoryList = ({categories}) => (
  <div>
    <Nav className={styles.nav}>
      {
        categories.map((item, i) => <CategoryItem key={i} item={item}/>)
      }
    </Nav>
  </div>
);

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state)
});

export default connect(mapStateToProps)(CategoryList);
