import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductUpdate from "../components/admin/product";
import {connect} from "react-redux";
import {createProduct} from "../redux/actions";

const AdminProductCreationPage = ({createProduct}) => {
  const initValues = {
    title: '',
    description: '',
    price: '',
    brand: '',
    subcategoryId: '',
    discountPercent: 0,
    saleTitle: 'Sale!',
    saleSubtitle: 'At the best price',
    saleBgColor: 'black'
  };

  return (
    <AdminLayout>
      <ProductUpdate
        initValues={initValues}
        buttonTitle='Create Product'
        handleSetProduct={createProduct}/>
    </AdminLayout>
  );
}

export default connect(null, {createProduct})(AdminProductCreationPage);
