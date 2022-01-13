import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav'
import styles from "./categoryItem.module.css";
import SVG from 'react-inlinesvg';

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
            <Dropdown.Item className={styles.subcategory} key={i}>{subc}</Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CategoryItem;
