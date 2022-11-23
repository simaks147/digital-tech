import React, {useEffect} from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import Product from "../components/admin/product";
import {
  loadingProductsSelector,
  productsSelector,
} from "../redux/selectors";
import {connect} from "react-redux";
import {loadProduct, updateProduct} from "../redux/actions";
import Loader from "../components/loader";
import { v4 as uuid } from 'uuid';
import {PropTypes as Types} from "prop-types";

const AdminProductUpdatePage = ({loadProduct, updateProduct, products, loading, match}) => {
  const id = match.params.slug;

  useEffect(() => {
    loadProduct(id);
  }, [loadProduct]);


  if (loading || !products[id]) return <Loader/>;

  const initValues = {
    title: products[id].title,
    description: products[id].description,
    price: products[id].price,
    brand: products[id].brand.id,
    subcategoryId: products[id].subcategoryId,
    discountPercent: products[id].sale.discountPercent,
    saleTitle: products[id].sale.title,
    saleSubtitle: products[id].sale.subtitle,
    saleBgColor: products[id].sale.bgColor
  };

  const initSpecification = products[id].specification.map(({title, description}) => {
    return {
      title,
      desc: description,
      num: uuid()
    };
  });

  return (
    <AdminLayout pageTitle="Admin | Update Product" pageDescription="Admin | Update Product">
      <Product
        id={id}
        initValues={initValues}
        initSpecification={initSpecification}
        initImages={products[id].images}
        initSaleImages={products[id].sale.images}
        buttonTitle='Update Product'
        handleSetProduct={updateProduct}
      />
    </AdminLayout>
  );
}

AdminProductUpdatePage.propTypes = {
  loadProduct: Types.func.isRequired,
  updateProduct: Types.func.isRequired,
  products: Types.objectOf(Types.object).isRequired,
  loading: Types.bool.isRequired
};

const mapStateToProps = (state, props) => ({
  products: productsSelector(state, props),
  loading: loadingProductsSelector(state)
});

export default connect(mapStateToProps, {loadProduct, updateProduct})(AdminProductUpdatePage);
