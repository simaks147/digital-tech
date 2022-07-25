import React, {useReducer} from 'react';
import {connect} from "react-redux";
import styles from './productFilter.module.css';
import {Accordion} from "react-bootstrap";
import Checkbox from "../checkbox";
import {productsFiltersSelector} from "../../redux/selectors";
import Button from "react-bootstrap/Button";
import {changeProductPageLocation} from "../../redux/actions";

const ProductFilter = ({brands, changeProductPageLocation, filters}) => {
  const reducer = (state, action) => {
    const {type, value, active} = action;

    switch (type) {
      case 'changeBrand':
        return {...state, brand: active ? state.brand.filter((item) => item !== value) : [...state.brand, value]};
      default:
        return state;
    }
  }

  const [currentFilters, setCurrentFilters] = useReducer(reducer, {...filters});

  return (
    <div className={styles.main}>
      <div className={styles.header}>Refind Your Results</div>
      <div className={styles.content}>
        <Accordion flush alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filter by Price</Accordion.Header>
            <Accordion.Body>
              <Checkbox>$100 - $300</Checkbox>
              <Checkbox>$300 - $700</Checkbox>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Filter by Brands</Accordion.Header>
            <Accordion.Body>
              {
                brands.map((brand) => {
                  const active = currentFilters.brand.includes(brand.id);

                  return <Checkbox
                    key={brand.id}
                    id={brand.id}
                    active={active}
                    disabled={false}
                    handleChange={() => setCurrentFilters({type: 'changeBrand', value: brand.id, active})}>{brand.title}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button className='c-button' onClick={() => changeProductPageLocation('filters', currentFilters)}>Refine Search</Button>
        <div>Reset Setting</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  filters: productsFiltersSelector(state, props)
});

export default connect(mapStateToProps, {changeProductPageLocation})(ProductFilter);
