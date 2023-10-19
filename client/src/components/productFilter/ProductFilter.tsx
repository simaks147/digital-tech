import React, { FC, useEffect, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import styles from './productFilter.module.css';
import { Accordion } from "react-bootstrap";
import Checkbox from "../checkbox";
import {
  minPriceProductsSelector,
  maxPriceProductsSelector,
  productsFiltersSelector,
  brandsListSelector
} from "../../redux/selectors";
import Button from "react-bootstrap/Button";
import { changeProductPageLocation } from "../../redux/actions";
import filtersToString from "../../utils/filtersToString";
import { ReactComponent as StarFullIcon } from "../../icons/star-full-icon.svg";
import InputRange, { Range } from "react-input-range";
import 'react-input-range/lib/css/index.css';
import useProductFilters from "../../hooks/use-product-filters";
import { PRODUCTS_RATING_VARIANTS } from "../../utils/consts";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import FormattedPrice from "../formattedPrice";
import { RootStateType } from "../../redux/store";
import { ISubcategory } from "../../redux/types/categories";
import { useHistory } from "react-router-dom";

interface IProps extends PropsFromRedux {
  subcategories?: ISubcategory[]
}

const ProductFilter: FC<IProps> = ({ brands, subcategories, changeProductPageLocation, filters, minPrice, maxPrice }) => {
  const history = useHistory()
  const pathname = useRef(history.location.pathname)

  useEffect(() => {
    history.listen((location) => {
      if (pathname.current !== location.pathname) {
        reset()
        pathname.current = location.pathname
      }
    });
  }, [history])

  const { currentFilters, changeBrand, changeCategory, changeRating, changePrice, reset } = useProductFilters({
    brand: filters?.brand || [],
    subcategoryId: filters?.subcategoryId || [],
    rating: Math.floor(filters?.rating) || null,
    minPrice: Math.floor(filters?.minPrice) | 0,
    maxPrice: Math.floor(filters?.maxPrice) | 0
  });

  const resetFilters = () => {
    reset();
    changeProductPageLocation('filters', filtersToString());
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>Refind Your Results</div>
      <div className={styles.content}>
        <Accordion flush alwaysOpen defaultActiveKey={['0', '3']}>

          <Accordion.Item eventKey='0'>
            <Accordion.Header>Filter by Price</Accordion.Header>
            <Accordion.Body>
              <form>
                <InputRange
                  minValue={minPrice}
                  maxValue={maxPrice}
                  allowSameValues={true}
                  disabled={minPrice === maxPrice}
                  /* @ts-ignore */
                  formatLabel={value => <FormattedPrice value={value} />}
                  value={{ min: currentFilters.minPrice || minPrice, max: currentFilters.maxPrice || maxPrice }}
                  onChange={value => changePrice(value as Range)}
                />
              </form>
            </Accordion.Body>
          </Accordion.Item>

          {
            !!subcategories && subcategories.length > 0 &&
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Filter by Category</Accordion.Header>
              <Accordion.Body>
                {
                  subcategories.map((category) => {
                    const { slug, title } = category;
                    const active = currentFilters.subcategoryId?.includes(slug);

                    return <Checkbox
                      key={slug}
                      id={slug}
                      active={active}
                      disabled={false}
                      handleChange={() => changeCategory(slug, active)}>{capitalizeFirstLetter(title)}</Checkbox>
                  })
                }
              </Accordion.Body>
            </Accordion.Item>
          }

          {
            brands.length > 0 &&
            <Accordion.Item eventKey='2'>
              <Accordion.Header>Filter by Brand</Accordion.Header>
              <Accordion.Body>
                {
                  brands.map((brand) => {
                    const { id, title } = brand;
                    const active = currentFilters.brand?.includes(id);

                    return <Checkbox
                      key={id}
                      id={id}
                      active={active}
                      disabled={false}
                      handleChange={() => changeBrand(id, active)}>{capitalizeFirstLetter(title)}</Checkbox>
                  })
                }
              </Accordion.Body>
            </Accordion.Item>
          }

          <Accordion.Item eventKey='3'>
            <Accordion.Header>Filter by Rating</Accordion.Header>
            <Accordion.Body>
              {
                PRODUCTS_RATING_VARIANTS.map(rating => {
                  const active = currentFilters.rating === rating;

                  const stars = [...Array(PRODUCTS_RATING_VARIANTS.length)].map((_, j) => {
                    if (j >= rating) return null;

                    return <StarFullIcon key={j} />;
                  });

                  return <Checkbox
                    key={rating}
                    id={rating.toString()}
                    active={active}
                    disabled={false}
                    handleChange={() => changeRating(rating, active)}>{stars}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
        <Button className='c-button'
          onClick={() => changeProductPageLocation('filters', filtersToString(currentFilters))}>Refine
          Search</Button>
        <div className={styles.resetButton} onClick={resetFilters}>Reset Setting</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootStateType) => ({
  filters: productsFiltersSelector(state),
  minPrice: minPriceProductsSelector(state),
  maxPrice: maxPriceProductsSelector(state),
  brands: brandsListSelector(state)
});

const connector = connect(mapStateToProps, { changeProductPageLocation });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductFilter);
