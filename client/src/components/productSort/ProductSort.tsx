import React, { Dispatch, FC } from 'react';
import { connect, ConnectedProps } from "react-redux";
import styles from './productSort.module.css';
import { ReactComponent as GridIcon } from "../../icons/grid-icon.svg";
import { ReactComponent as ListIcon } from "../../icons/list-icon.svg";
import { Dropdown } from "react-bootstrap";
import cn from "classnames";
import { productsLimitSelector, productsSortSelector } from "../../redux/selectors";
import { changeProductPageLocation } from "../../redux/actions";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { windowWidth } from "../../config";
import useWindowSize from "../../hooks/use-window-size";
import { RootStateType } from '../../redux/store';
import { PRODUCTS_LIMIT_VARIANTS, PRODUCTS_SORT_VARIANTS } from "../../utils/consts";


interface IOwnProps {
  showGridSwitcher?: boolean,
  productView?: string,
  changeProductView?: Dispatch<any>
}


type IProps = IOwnProps & PropsFromRedux

const ProductSort: FC<IProps> = ({
  showGridSwitcher,
  changeProductPageLocation,
  limit,
  sort,
  productView,
  changeProductView
}) => {
  const { width } = useWindowSize();

  return (
    <div className={styles.main}>
      <div className={styles.order}>
        <span className={styles.orderTitle}>Sort By:</span>
        <Dropdown onSelect={(eventKey) => changeProductPageLocation('sort', eventKey!)}>
          <Dropdown.Toggle className={styles.toggle}>{capitalizeFirstLetter(sort)}</Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            {
              PRODUCTS_SORT_VARIANTS.map((srt) => <Dropdown.Item key={srt} eventKey={srt}
                active={srt === sort}>{capitalizeFirstLetter(srt)}</Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={styles.order}>
        <span className={styles.orderTitle}>Show:</span>
        <Dropdown onSelect={(eventKey) => changeProductPageLocation('limit', eventKey!)}>
          <Dropdown.Toggle className={styles.toggle}>{capitalizeFirstLetter(limit)}</Dropdown.Toggle>
          <Dropdown.Menu className={styles.menu}>
            {
              PRODUCTS_LIMIT_VARIANTS.map((lim) => <Dropdown.Item key={lim} eventKey={lim}
                active={lim === limit}>{capitalizeFirstLetter(lim)}</Dropdown.Item>)
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {
        showGridSwitcher && !!changeProductView && width! >= windowWidth.md &&
        <div className={styles.view}>
          <span className={cn(styles.viewItem, { active: productView === 'grid' })} onClick={() => changeProductView('grid')}>
            <GridIcon />
          </span>
          <span className={cn(styles.viewItem, { active: productView === 'list' })} onClick={() => changeProductView('list')}>
            <ListIcon />
          </span>
        </div>
      }
    </div>
  );
}

ProductSort.defaultProps = {
  showGridSwitcher: true
};

const mapStateToProps = (state: RootStateType, props: IOwnProps) => ({
  limit: productsLimitSelector(state),
  sort: productsSortSelector(state)
});

const connector = connect(mapStateToProps, { changeProductPageLocation });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductSort);
