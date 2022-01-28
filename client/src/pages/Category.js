import React from 'react';
import {productsIdsByCategorySelector} from "../redux/selectors";
import {connect} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import ProductItem from "../components/productItem";

const Category = ({productsIds}) => (
  <div>
    <Container>
      <Row xs={1}>
        {
          productsIds.map(id => (
              <Col key={id} className='my-3'>
                <ProductItem id={id}/>
              </Col>
            )
          )
        }
      </Row>
    </Container>
  </div>
);

const mapStateToProps = (state, props) => ({
  productsIds: productsIdsByCategorySelector(state, props)
})

export default connect(mapStateToProps)(Category);
