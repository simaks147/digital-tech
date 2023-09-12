import React, { FC } from 'react';
import cn from 'classnames';
import styles from './BasketNav.module.css';
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as CartIcon } from '../../icons/cart-icon2.svg';
import { activeBasketViewSelector, orderListSelector } from "../../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { BASKET_ROUTE_SHOPPING, BASKET_VIEWS } from "../../utils/consts";
import { useRouteMatch } from "react-router-dom";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const BasketNav: FC<IProps> = ({ order, activeBasketView }) => {
  const shoppingPage = useRouteMatch(BASKET_ROUTE_SHOPPING);

  return (
    <div className={styles.section}>
      <Container>
        <div className={styles.sectionInner}>
          <Row xs='auto' className={cn(styles.header, 'justify-content-center', 'align-items-center')}>
            <Col>
              <CartIcon />
              <span className={styles.title}>{!order.length && shoppingPage ? 'Cart is Empty' : BASKET_VIEWS[activeBasketView as keyof typeof BASKET_VIEWS]}</span>
            </Col>
          </Row>
          {
            !order.length && shoppingPage
              ? ''
              : <Row xs='auto' className={cn(styles.list, 'justify-content-center', 'align-items-center')}>
                {
                  Object.values(BASKET_VIEWS).map((view, i) => (
                    <Col key={i} className="align-items-center d-flex">
                      <div className={cn(styles.listItem, { active: view === BASKET_VIEWS[activeBasketView as keyof typeof BASKET_VIEWS] })}>
                        <div className={styles.listItemNum}>{i + 1}</div>
                        <div className={styles.listItemTitle}>{view}</div>
                      </div>
                      <ArrowIcon />
                    </Col>
                  ))
                }
              </Row>
          }
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = (state: RootStateType) => ({
  order: orderListSelector(state),
  activeBasketView: activeBasketViewSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BasketNav);
