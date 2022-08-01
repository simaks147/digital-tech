import {connect} from "react-redux";
import styles from './productFilter.module.css';
import {Accordion} from "react-bootstrap";
import Checkbox from "../checkbox";
import {
  minPriceProductsSelector,
  maxPriceProductsSelector,
  productsFiltersSelector
} from "../../redux/selectors";
import Button from "react-bootstrap/Button";
import {changeProductPageLocation} from "../../redux/actions";
import filtersToString from "../../utils/filtersToString";
import {ReactComponent as StarFullIcon} from "../../icons/star-full-icon.svg";
import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css';
import useProductFilters from "../../hooks/use-product-filters";

const ProductFilter = ({brands, changeProductPageLocation, filters, subcategories, minPrice, maxPrice}) => {
  const {currentFilters, changeBrand, changeCategory, changeRating, changePrice} = useProductFilters({
    brand: filters.brand || [],
    subcategoryId: filters.subcategoryId || [],
    rating: Math.floor(filters.rating) || null,
    minPrice: Math.floor(filters.minPrice) || minPrice,
    maxPrice: Math.floor(filters.maxPrice) || maxPrice
  });

  return (
    <div className={styles.main}>
      <div className={styles.header}>Refind Your Results</div>
      <div className={styles.content}>
        <Accordion flush alwaysOpen defaultActiveKey={[0, 3]}>

          <Accordion.Item eventKey={0}>
            <Accordion.Header>Filter by Price</Accordion.Header>
            <Accordion.Body>
              <form>
              <InputRange
                minValue={minPrice}
                maxValue={maxPrice}
                allowSameValues={true}
                // formatLabel={value => `${value} kg`}
                value={{min: currentFilters.minPrice, max: currentFilters.maxPrice}}
                onChange={value => changePrice(value)}
              />
              </form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={1}>
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
                    handleChange={() => changeCategory(slug, active)}>{title}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={2}>
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
                    handleChange={() => changeBrand(id, active)}>{title}</Checkbox>
                })
              }
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey={3}>
            <Accordion.Header>Filter by Rating</Accordion.Header>
            <Accordion.Body>
              {
                [1, 2, 3, 4, 5].map(rating => {
                  const active = currentFilters.rating === rating;

                  const stars = [...Array(5)].map((_, j) => {
                    if (j >= rating) return null;

                    return <StarFullIcon key={j}/>;
                  });

                  return <Checkbox
                    key={rating}
                    id={rating}
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
        <div className={styles.resetButton} onClick={() => changeProductPageLocation('filters', filtersToString())}>Reset Setting</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  filters: productsFiltersSelector(state, props),
  minPrice: minPriceProductsSelector(state),
  maxPrice: maxPriceProductsSelector(state)
});

export default connect(mapStateToProps, {changeProductPageLocation})(ProductFilter);
