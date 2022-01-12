import React from 'react';
import {Nav} from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import {category_list} from "../../fixtures";
import styles from './categoryList.module.css'
import './categoryList.css'

const CategoryList = () => {
  return (
    <div>
        <Nav className={styles.nav}>
          {
            category_list.map(item =>
              <NavDropdown className={styles.item} title={<img src={require(`${item.img}`)} alt=''/>} key={item.id}>
                {
                  item.subcategory.map( (subc, i) =>
                    <NavDropdown.Item className={styles.subcategory} key={i}>{subc}</NavDropdown.Item>)
                }
              </NavDropdown>
            )
          }
        </Nav>
    </div>
  );
};

export default CategoryList;
