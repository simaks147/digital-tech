import React from 'react';
import {connect} from "react-redux";
import styles from './productSort.module.css';
import {ReactComponent as GridIcon} from "../../icons/grid-icon.svg";
import {ReactComponent as ListIcon} from "../../icons/list-icon.svg";
import {Dropdown} from "react-bootstrap";
import cn from "classnames";

const ProductSort = ({showGridSwitcher = true}) => (
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
      <Dropdown>
        <Dropdown.Toggle className={styles.toggle}>12</Dropdown.Toggle>
        <Dropdown.Menu className={styles.menu}>
          {
            <>
              <Dropdown.Item className={styles.item} key={0} eventKey={0}>All</Dropdown.Item>
              <Dropdown.Item className={styles.item} key={1} eventKey={1}>6</Dropdown.Item>
              <Dropdown.Item className={styles.item} key={2} eventKey={2} active>12</Dropdown.Item>
              <Dropdown.Item className={styles.item} key={3} eventKey={3}>24</Dropdown.Item>
            </>
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

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch, props) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSort);
