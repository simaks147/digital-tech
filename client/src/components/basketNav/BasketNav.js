import React from 'react';
import cn from 'classnames';
import styles from './BasketNav.module.css';
import {Container, Row, Col} from "react-bootstrap";
import {ReactComponent as ArrowIcon} from '../../icons/arrow.svg';
import {ReactComponent as CartIcon} from '../../icons/cart-icon2.svg';
import {orderTotalSelector, activeBasketViewSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {BASKET_VIEWS} from "../../utils/consts";

const BasketNav = ({total, activeBasketView}) => (
  <div className={styles.section}>
    <Container>
      <div className={styles.sectionInner}>
        <Row xs='auto' className={cn(styles.header, 'justify-content-center', 'align-items-center')}>
          <Col>
            <CartIcon/>
            <span className={styles.title}>{total ? activeBasketView : 'Cart is Empty'}</span>
          </Col>
        </Row>
        {
          !!total &&
          <Row xs='auto' className={cn(styles.list, 'justify-content-center', 'align-items-center')}>
            {
              BASKET_VIEWS.map((view, i) => (
                <React.Fragment key={i}>
                  <Col>
                    <div className={cn(styles.listItem, {active: view === activeBasketView})}>
                      <div className={styles.listItemNum}>{i + 1}</div>
                      <div className={styles.listItemTitle}>{view}</div>
                    </div>
                  </Col>
                  <Col>
                    <ArrowIcon/>
                  </Col>
                </React.Fragment>
              ))
            }
          </Row>
        }
      </div>
    </Container>
  </div>
);

const mapStateToProps = (state, props) => ({
  total: orderTotalSelector(state, props),
  activeBasketView: activeBasketViewSelector(state, props)
});

export default connect(mapStateToProps)(BasketNav);
