import React from 'react';
import {Pagination} from "react-bootstrap";
import {
  productsAllPagesSelector,
  productsPageSelector
} from "../../redux/selectors";
import {connect} from "react-redux";
import {changeProductPageLocation} from "../../redux/actions";

const CustomPagination = ({changeProductPageLocation, productsAllPagesSelector, page}) => {
  // const page = Number(queryParams.page) || 1;

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


const mapStateToProps = (state, props) => ({
  productsAllPagesSelector: productsAllPagesSelector(state, props),
  page: productsPageSelector(state, props)
});

export default connect(mapStateToProps, {changeProductPageLocation})(CustomPagination);
