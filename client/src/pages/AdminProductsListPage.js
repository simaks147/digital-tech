import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductsList from "../components/admin/productsList";

const AdminProductPage = () => (
  <AdminLayout>
    <ProductsList/>
  </AdminLayout>
);

export default AdminProductPage;
