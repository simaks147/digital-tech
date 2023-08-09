import React, { FC } from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductUpdate from "../components/admin/product";
import { connect, ConnectedProps } from "react-redux";
import { createProduct } from "../redux/actions";

interface IProps extends PropsFromRedux { }

const AdminProductCreationPage: FC<IProps> = ({ createProduct }) => {
  return (
    <AdminLayout pageTitle="Admin | Create Product" pageDescription="Admin | Create Product">
      <ProductUpdate
        buttonTitle='Create Product'
        handleSetProduct={createProduct} />
    </AdminLayout>
  );
}

const connector = connect(null, { createProduct });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AdminProductCreationPage);
