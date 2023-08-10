import React, { FC } from 'react';
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav'
import styles from "./categoryItem.module.css";
import SVG from 'react-inlinesvg';
import { CATEGORY_ROUTE } from "../../../utils/consts";
import cn from "classnames";
import { activeSubcategorySelector, activeCategorySelector } from "../../../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import capitalizeFirstLetter from "../../../utils/capitalizeFirstLetter";
import { ICategory } from '../../../redux/types/categories';
import { RootStateType } from '../../../redux/store';

interface IOwnProps {
  item: ICategory
}

type IProps = IOwnProps & PropsFromRedux

const CategoryItem: FC<IProps> = ({ item, activeSubcategory, activeCategory }) => (
  <Dropdown className={cn({ active: item.slug === activeCategory }, styles.item)}>
    <Dropdown.Toggle as={Nav.Link}>
      <SVG src={process.env.PUBLIC_URL + item.img} />
      <div className={styles.itemTitle}>{capitalizeFirstLetter(item.title)}</div>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {
        item.subcategory.map(subc =>
          <Dropdown.Item as={Link}
            className={cn({ active: subc.slug === activeSubcategory }, styles.subcategory)}
            key={subc.slug}
            to={`${CATEGORY_ROUTE}/${subc.slug}`}>{capitalizeFirstLetter(subc.title)}
          </Dropdown.Item>)
      }
    </Dropdown.Menu>
  </Dropdown>
);

const mapStateToProps = (state: RootStateType) => ({
  activeSubcategory: activeSubcategorySelector(state),
  activeCategory: activeCategorySelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CategoryItem);

