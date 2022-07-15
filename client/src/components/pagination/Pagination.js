import React from 'react';
import {Pagination} from "react-bootstrap";
import {routerSelector, totalCountProductsSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {changeProductPageLocation} from "../../redux/actions";

const CustomPagination = ({queryParams, totalCount, changeProductPageLocation}) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 3;
  const arrayFromTotalCount = [...Array(Math.ceil(totalCount / limit))];

  // !arrayFromTotalCount.length && '';

  return (
    <Pagination>
      {
        page > 1 &&
        <Pagination.Prev onClick={() => changeProductPageLocation('page', page - 1)}/>
      }
      {
        arrayFromTotalCount.map((_, i) => {
          const num = i + 1;
          return <Pagination.Item key={num} active={num === page}
                                  onClick={() => changeProductPageLocation('page', num)}>{num}</Pagination.Item>
        })
      }
      {
        page < arrayFromTotalCount.length &&
        <Pagination.Next onClick={() => changeProductPageLocation('page', page + 1)}/>
      }
    </Pagination>
  );
}


const mapStateToProps = (state) => ({
  queryParams: routerSelector(state).location.query,
  totalCount: totalCountProductsSelector(state)
});

export default connect(mapStateToProps, {changeProductPageLocation})(CustomPagination);
