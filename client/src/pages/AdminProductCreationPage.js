import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductUpdate from "../components/admin/product";
import {connect} from "react-redux";
import {createProduct} from "../redux/actions";
import {PropTypes as Types} from "prop-types";

const AdminProductCreationPage = ({createProduct}) => {
  return (
    <AdminLayout pageTitle="Admin | Create Product" pageDescription="Admin | Create Product">
      <ProductUpdate
        buttonTitle='Create Product'
        handleSetProduct={createProduct}/>
    </AdminLayout>
  );
}

AdminProductCreationPage.propTypes = {
  createProduct: Types.func.isRequired
};

export default connect(null, {createProduct})(AdminProductCreationPage);
