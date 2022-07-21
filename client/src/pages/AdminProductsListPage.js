import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductsList from "../components/admin/productsList";

const AdminProductPage = () => (
  <AdminLayout>
    <ProductsList
      limitVariants={['3', '6', 'all']}
      sortVariants={['title', 'price', 'newest', 'rating']}
      filtersVariants={['brand', 'price', 'category', 'rating']}
    />
  </AdminLayout>
);

export default AdminProductPage;
