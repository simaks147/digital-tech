import React from 'react';
import {products} from "../../fixtures";
import ProductItem from "../productItem";
import {Container, Row, Col} from "react-bootstrap";


const ProductList = () => {
  return (
    <div>
      <Container>
        <Row xs={1}>
          {
            products.map(product => (
                <Col key={product.id} className='my-3'>
                  <ProductItem product={product}/>
                </Col>
              )
            )
          }
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
