import React from 'react';
import {connect} from "react-redux";
import styles from './productSort.module.css';
import {ReactComponent as GridIcon} from "../../icons/grid-icon.svg";
import {ReactComponent as ListIcon} from "../../icons/list-icon.svg";
import {Dropdown} from "react-bootstrap";
import cn from "classnames";
import {productsLimitSelector, productsSortSelector} from "../../redux/selectors";
import {changeProductPageLocation} from "../../redux/actions";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import {windowWidth} from "../../config";
import useWindowSize from "../../hooks/use-window-size";
import {PropTypes as Types} from "prop-types";

const ProductSort = ({
                       showGridSwitcher,
                       sortVariants,
                       limitVariants,
                       changeProductPageLocation,
                       limit,
                       sort,
                       productView,
                       changeProductView
                     }) => {
  const {width} = useWindowSize();

  return (
    <div className={styles.main}>
      <div className={styles.order}>
        <span className={styles.orderTitle}>Sort By:</span>
        <Dropdown onSelect={(eventKey) => changeProductPageLocation('sort', eventKey)}>
          <Dropdown.Toggle className={styles.toggle}>{capitalizeFirstLetter(sort)}</Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            {
              sortVariants.map((srt) => <Dropdown.Item className={styles.item} key={srt} eventKey={srt}
                                                       active={srt === sort}>{capitalizeFirstLetter(srt)}</Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.order}>
        <span className={styles.orderTitle}>Show:</span>
        <Dropdown onSelect={(eventKey) => changeProductPageLocation('limit', eventKey)}>
          <Dropdown.Toggle className={styles.toggle}>{capitalizeFirstLetter(limit)}</Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            {
              limitVariants.map((lim) => <Dropdown.Item className={styles.item} key={lim} eventKey={lim}
                                                        active={lim === limit}>{capitalizeFirstLetter(lim)}</Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {
        showGridSwitcher && width >= windowWidth.md &&
        <div className={styles.view}>
          <span className={cn(styles.viewItem, {active: productView === 'grid'})} onClick={() => changeProductView('grid')}>
            <GridIcon/>
          </span>
          <span className={cn(styles.viewItem, {active: productView === 'list'})} onClick={() => changeProductView('list')}>
            <ListIcon/>
          </span>
        </div>
      }
    </div>
  );
}

ProductSort.propTypes = {
  showGridSwitcher: Types.bool,
  sortVariants: Types.arrayOf(Types.string.isRequired).isRequired,
  limitVariants: Types.arrayOf(Types.string.isRequired).isRequired,
  changeProductPageLocation: Types.func.isRequired,
  limit: Types.string.isRequired,
  sort: Types.string.isRequired,
  productView: Types.string,
  changeProductView: Types.func
};

ProductSort.defaultProps = {
  showGridSwitcher: true
};

const mapStateToProps = (state, props) => ({
  limit: productsLimitSelector(state, props),
  sort: productsSortSelector(state, props)
});

export default connect(mapStateToProps, {changeProductPageLocation})(ProductSort);
