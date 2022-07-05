import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductUpdate from "../components/admin/productUpdate";

const AdminProductUpdatePage = ({match}) => (
  <AdminLayout>
    <ProductUpdate id={match.params.slug}/>
  </AdminLayout>
);

export default AdminProductUpdatePage;
