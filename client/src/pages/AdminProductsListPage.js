import React from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductsList from "../components/admin/productsList";
import {PRODUCTS_LIMIT_VARIANTS, PRODUCTS_SORT_VARIANTS} from "../utils/consts";

const AdminProductPage = () => (
  <AdminLayout>
    <ProductsList
      limitVariants={PRODUCTS_LIMIT_VARIANTS}
      sortVariants={PRODUCTS_SORT_VARIANTS}
    />
  </AdminLayout>
);

export default AdminProductPage;
