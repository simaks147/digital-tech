import React from 'react';
import {connect} from "react-redux";
import Nav from 'react-bootstrap/Nav'
import styles from './categoryList.module.css'
import CategoryItem from "./categoryItem";
import {categoriesListSelector} from "../../redux/selectors";
import {Container} from "react-bootstrap";

const CategoryList = ({categories}) => (
  <div className={styles.section}>
    <Container>
      <Nav className={styles.nav}>
        {
          categories.map((item, i) => <CategoryItem key={i} item={item}/>)
        }
      </Nav>
    </Container>
  </div>
);

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state),
});

export default connect(mapStateToProps)(CategoryList);
