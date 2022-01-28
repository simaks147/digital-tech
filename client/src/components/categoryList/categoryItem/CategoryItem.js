import React from 'react';
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav'
import styles from "./categoryItem.module.css";
import SVG from 'react-inlinesvg';
import {CATEGORY_ROUTE} from "../../../utils/consts"


const CategoryItem = ({item}) => (
  <Dropdown className={styles.item}>
    <Dropdown.Toggle as={Nav.Link}>
      <SVG src={require(`${item.img}`)}/>
      <div className={styles.itemTitle}>{item.title}</div>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {
        item.subcategory.map(subc =>
          <Dropdown.Item as={Link} className={styles.subcategory} key={subc.id}
                         to={CATEGORY_ROUTE + '/' + subc.slug}>{subc.title}</Dropdown.Item>)
      }
    </Dropdown.Menu>
  </Dropdown>
);

export default CategoryItem;

