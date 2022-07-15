import React from 'react';
import {connect} from "react-redux";
import styles from './productSort.module.css';
import {ReactComponent as GridIcon} from "../../icons/grid-icon.svg";
import {ReactComponent as ListIcon} from "../../icons/list-icon.svg";
import {Dropdown} from "react-bootstrap";
import cn from "classnames";
import {routerSelector, totalCountProductsSelector} from "../../redux/selectors";
import {changeProductPageLocation} from "../../redux/actions";

const ProductSort = ({showGridSwitcher = true, queryParams, totalCount, changeProductPageLocation}) => {
  const limit = Number(queryParams.limit) || 3;

  return (
    <div className={styles.main}>
      <div className={styles.order}>
        <span className={styles.orderTitle}>Sort By:</span>
        <Dropdown>
          <Dropdown.Toggle className={styles.toggle}>Popularity</Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            {
              <>
                <Dropdown.Item className={styles.item} key={1} eventKey={1} active>Popularity</Dropdown.Item>
                <Dropdown.Item className={styles.item} key={2} eventKey={2}>Price</Dropdown.Item>
                <Dropdown.Item className={styles.item} key={3} eventKey={3}>Brand</Dropdown.Item>
              </>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.order}>
        <span className={styles.orderTitle}>Show:</span>
        <Dropdown onSelect={(eventKey) => changeProductPageLocation('limit', eventKey)}>
          <Dropdown.Toggle className={styles.toggle}>{limit !== totalCount ? limit : 'All'}</Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            <Dropdown.Item className={styles.item} eventKey={totalCount}>All</Dropdown.Item>
            {
              [2, 4, 6].map((lim) => <Dropdown.Item className={styles.item} key={lim} eventKey={lim} active={lim === limit}>{lim}</Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {
        showGridSwitcher &&
        <div className={styles.view}>
        <span className={styles.viewItem}>
          <GridIcon/>
        </span>
          <span className={cn(styles.viewItem, 'active')}>
          <ListIcon/>
        </span>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  queryParams: routerSelector(state).location.query,
  totalCount: totalCountProductsSelector(state)
});

export default connect(mapStateToProps, {changeProductPageLocation})(ProductSort);
