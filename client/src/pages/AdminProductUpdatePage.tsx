import React, { FC, useEffect } from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import Product from "../components/admin/product";
import { loadingProductsSelector, productsSelector } from "../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { loadProduct, updateProduct } from "../redux/actions";
import Loader from "../components/loader";
import { v4 as uuid } from 'uuid';
import { RootStateType } from '../redux/store';
import { RouteComponentProps } from 'react-router-dom';

interface IOwnProps { }

interface IRoutParams {
  slug: string
}

type IProps = IOwnProps & PropsFromRedux & RouteComponentProps<IRoutParams>

const AdminProductUpdatePage: FC<IProps> = ({ loadProduct, updateProduct, products, loading, match }) => {
  const id = match.params.slug;

  useEffect(() => {
    loadProduct(id);
  }, [loadProduct]);


  if (loading || !products[id]) return <Loader />;

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

  const initSpecification = products[id].specification.map(({ title, description }) => {
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

const mapStateToProps = (state: RootStateType) => ({
  products: productsSelector(state),
  loading: loadingProductsSelector(state)
});

const connector = connect(mapStateToProps, { loadProduct, updateProduct });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AdminProductUpdatePage);
