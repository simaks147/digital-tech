import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductUpdate from "../components/admin/product";
import {connect} from "react-redux";
import {createProduct} from "../redux/actions";

const AdminProductCreationPage = ({createProduct}) => {
  return (
    <AdminLayout>
      <ProductUpdate
        buttonTitle='Create Product'
        handleSetProduct={createProduct}/>
    </AdminLayout>
  );
}

export default connect(null, {createProduct})(AdminProductCreationPage);
