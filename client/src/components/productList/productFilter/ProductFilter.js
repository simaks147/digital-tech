import React from 'react';
import {connect} from "react-redux";
import styles from './productFilter.module.css';
import {Accordion} from "react-bootstrap";
import Checkbox from "../../checkbox";

const ProductFilter = () => (
  <div className={styles.main}>
    <div className={styles.header}>Refind Your Results</div>
    <div className={styles.content}>
      <Accordion flush alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Filter by Price</Accordion.Header>
          <Accordion.Body>
            <Checkbox>All Price</Checkbox>
            <Checkbox>$100 - $300</Checkbox>
            <Checkbox>$300 - $700</Checkbox>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Filter by Brands</Accordion.Header>
          <Accordion.Body>
            <Checkbox>All Brands</Checkbox>
            <Checkbox>Nikon</Checkbox>
            <Checkbox>Sony</Checkbox>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  </div>
);

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch, props) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFilter);
