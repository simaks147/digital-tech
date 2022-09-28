import React from 'react';
import {Pagination} from "react-bootstrap";
import {
  productsAllPagesSelector,
  productsPageSelector
} from "../../redux/selectors";
import {connect} from "react-redux";
import {changeProductPageLocation} from "../../redux/actions";
import {PropTypes as Types} from "prop-types";

const CustomPagination = ({changeProductPageLocation, productsAllPagesSelector, page}) => {
  if (productsAllPagesSelector.length === 1) return null;

  return (
    <Pagination>
      {
        page > 1 &&
        <Pagination.Prev onClick={() => changeProductPageLocation('page', page - 1)}/>
      }
      {
        productsAllPagesSelector.map((item) => <Pagination.Item key={item} active={item === page}
                                                           onClick={() => changeProductPageLocation('page', item)}>{item}</Pagination.Item>
        )
      }
      {
        page < productsAllPagesSelector.length &&
        <Pagination.Next onClick={() => changeProductPageLocation('page', page + 1)}/>
      }
    </Pagination>
  );
}

CustomPagination.propTypes = {
  changeProductPageLocation: Types.func.isRequired,
  limitVariants: Types.arrayOf(Types.string.isRequired).isRequired,
  productsAllPagesSelector: Types.arrayOf(Types.number.isRequired).isRequired,
  page: Types.number.isRequired
};

const mapStateToProps = (state, props) => ({
  productsAllPagesSelector: productsAllPagesSelector(state, props),
  page: productsPageSelector(state, props)
});

export default connect(mapStateToProps, {changeProductPageLocation})(CustomPagination);
