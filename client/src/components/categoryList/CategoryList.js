import React from 'react';
import {Nav} from "react-bootstrap";
import {category_list} from "../../fixtures";
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";

const CategoryList = () => {
  return (
    <div>
        <Nav className={styles.nav}>
          {
            category_list.map((item, i) => <CategoryItem key={i} item={item}/>)
          }
        </Nav>
    </div>
  );
};

export default CategoryList;
