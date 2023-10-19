import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductsList from "../components/admin/productsList";

const AdminProductPage = () => (
  <AdminLayout pageTitle="Admin | Products List" pageDescription="Admin | Products List">
    <ProductsList />
  </AdminLayout>
);

export default AdminProductPage;
