import React, { FC } from 'react';
import { Pagination } from "react-bootstrap";
import {
  productsAllPagesSelector,
  productsPageSelector
} from "../../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { changeProductPageLocation } from "../../redux/actions";
import { RootStateType } from '../../redux/store';

interface IOwnProps {
  limitVariants: string[]
}


type IProps = IOwnProps & PropsFromRedux

const CustomPagination: FC<IProps> = ({ changeProductPageLocation, productsAllPagesSelector, page }) => {
  if (productsAllPagesSelector.length <= 1) return null;

  return (
    <Pagination>
      {
        page > 1 &&
        <Pagination.Prev onClick={() => changeProductPageLocation('page', page - 1)} />
      }
      {
        productsAllPagesSelector.map((item) => <Pagination.Item key={item} active={item === page}
          onClick={() => changeProductPageLocation('page', item)}>{item}</Pagination.Item>
        )
      }
      {
        page < productsAllPagesSelector.length &&
        <Pagination.Next onClick={() => changeProductPageLocation('page', page + 1)} />
      }
    </Pagination>
  );
}

const mapStateToProps = (state: RootStateType, props: IOwnProps) => ({
  productsAllPagesSelector: productsAllPagesSelector(state, props),
  page: productsPageSelector(state, props)
});

const connector = connect(mapStateToProps, { changeProductPageLocation });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CustomPagination);
