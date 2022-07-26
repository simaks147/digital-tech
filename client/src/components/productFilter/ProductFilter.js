import React, {useReducer} from 'react';
import {connect} from "react-redux";
import styles from './productFilter.module.css';
import {Accordion} from "react-bootstrap";
import Checkbox from "../checkbox";
import {productsFiltersSelector} from "../../redux/selectors";
import Button from "react-bootstrap/Button";
import {changeProductPageLocation} from "../../redux/actions";
import filtersToString from "../../utils/filtersToString";
import {ReactComponent as StarFullIcon} from "../../icons/star-full-icon.svg";

const ProductFilter = ({brands, changeProductPageLocation, filters, subcategories}) => {
  const reducer = (state, action) => {
    const {type, value, active} = action;

    switch (type) {
      case 'changeBrand':
        return {...state, brand: active ? state.brand.filter((item) => item !== value) : [...state.brand, value]};
      case 'changeCategory':
        return {...state, subcategoryId: active ? state.subcategoryId.filter((item) => item !== value) : [...state.subcategoryId, value]};
      case 'changeRating':
        return {...state, rating: [value]};
      default:
        return state;
    }
  }

  const defaultState = {
    brand: filters.brand || [],
    subcategoryId: filters.subcategoryId || [],
    rating: filters.rating || []
  };

  const [currentFilters, setCurrentFilters] = useReducer(reducer, defaultState);

  return (
    <div className={styles.main}>
      <div className={styles.header}>Refind Your Results</div>
      <div className={styles.content}>
        <Accordion flush alwaysOpen>

          <Accordion.Item eventKey="0">
            <Accordion.Header>Filter by Category</Accordion.Header>
            <Accordion.Body>
              {
                subcategories.map((category) => {
                  const {slug, title} = category;
                  const active = currentFilters.subcategoryId?.includes(slug);

                  return <Checkbox
                    key={slug}
                    id={slug}
                    active={active}
                    disabled={false}
                    handleChange={() => setCurrentFilters({
                      type: 'changeCategory',
                      value: slug,
                      active
                    })}>{title}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Filter by Brand</Accordion.Header>
            <Accordion.Body>
              {
                brands.map((brand) => {
                  const {id, title} = brand;
                  const active = currentFilters.brand?.includes(id);

                  return <Checkbox
                    key={id}
                    id={id}
                    active={active}
                    disabled={false}
                    handleChange={() => setCurrentFilters({type: 'changeBrand', value: id, active})}>{title}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Filter by Rating</Accordion.Header>
            <Accordion.Body>
              {
                ['1', '2', '3', '4', '5'].map(rating => {
                  const active = currentFilters.rating[0] === String(rating);

                  const stars = [...Array(5)].map((_, j) => {
                    if (j >= rating) return;

                    return <StarFullIcon key={j}/>;
                  });

                  return <Checkbox
                    key={rating}
                    id={rating}
                    active={active}
                    disabled={false}
                    handleChange={() => setCurrentFilters({type: 'changeRating', value: rating, active})}>{stars}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
        <Button className='c-button'
                onClick={() => changeProductPageLocation('filters', filtersToString(currentFilters))}>Refine
          Search</Button>
        <div>Reset Setting</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  filters: productsFiltersSelector(state, props)
});

export default connect(mapStateToProps, {changeProductPageLocation})(ProductFilter);
