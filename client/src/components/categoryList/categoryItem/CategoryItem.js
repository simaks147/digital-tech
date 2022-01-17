import React from 'react';
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav'
import styles from "./categoryItem.module.css";
import SVG from 'react-inlinesvg';
import {CATEGORY_ROUTE} from "../../../utils/consts"



const CategoryItem = ({item}) => {
  return (
    <Dropdown className={styles.item}>
      <Dropdown.Toggle as={Nav.Link}>
        <SVG src={require(`${item.img}`)}/>
        <div className={styles.itemTitle}>{item.title}</div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          item.subcategory.map((subc, i) =>
            <Dropdown.Item as={Link} className={styles.subcategory} key={i} to={CATEGORY_ROUTE + '/' + subc}>{subc}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryItem;
