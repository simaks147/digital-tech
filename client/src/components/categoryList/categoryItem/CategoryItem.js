import React from 'react';
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from 'react-bootstrap/Nav'
import styles from "./categoryItem.module.css";
import SVG from 'react-inlinesvg';
import {CATEGORY_ROUTE} from "../../../utils/consts";
import cn from "classnames";
import {activeSubcategorySelector, activeCategorySelector} from "../../../redux/selectors";
import {connect} from "react-redux";


const CategoryItem = ({item, activeSubcategory, activeCategory}) => {
  // const matchCategory = useRouteMatch('/category/:id');
  // const matchProduct = useRouteMatch('/product/:id');
  // console.log(matchProduct);

  // if (matchProduct.params.id ===)

  // const currentCategoryAndSubat =

  return (
    <Dropdown className={cn({active: item.slug === activeCategory}, styles.item)}>
      <Dropdown.Toggle as={Nav.Link}>
        <SVG src={process.env.PUBLIC_URL + item.img}/>
        <div className={styles.itemTitle}>{item.title}</div>
        {/*{console.log(item.slug)}*/}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          item.subcategory.map(subc =>
            <Dropdown.Item as={Link}
                           className={cn({active: subc.slug === activeSubcategory}, styles.subcategory)}
                           // activeClassName="active"
                           key={subc.slug}
                           to={CATEGORY_ROUTE + '/' + subc.slug}>{subc.title}
            </Dropdown.Item>)
        }
      </Dropdown.Menu>
    </Dropdown>
  );
}

// cn({active: 'dfg'}, styles.subcategory)

const mapStateToProps = (state, props) => ({
  activeSubcategory: activeSubcategorySelector(state, props),
  activeCategory: activeCategorySelector(state, props)
});

export default connect(mapStateToProps)(CategoryItem);

