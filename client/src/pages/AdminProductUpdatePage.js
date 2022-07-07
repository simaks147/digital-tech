import React, {useEffect} from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import Product from "../components/admin/product";
import {
  loadingProductsSelector,
  productsSelector,
} from "../redux/selectors";
import {connect} from "react-redux";
import {loadProduct, updateProduct} from "../redux/actions";
import Loader from "../components/loader";

const AdminProductUpdatePage = ({loadProduct, updateProduct, products, loading, match}) => {
  const id = match.params.slug;

  useEffect(() => {
    loadProduct(id);
  }, [loadProduct]);


  if (loading || !products[id]) return <Loader/>;

  const initValues = {
    title: products[id].title,
    description: products[id].description,
    price: products[id].price,
    brand: products[id].brand.id,
    subcategoryId: products[id].subcategoryId,
  };

  const initSpecification = products[id].specification.map(( {title, description}, i) => {
    return {
      title,
      desc: description,
      num: Date.now() + i
    };
  });

  return (
    <AdminLayout>
      <Product
        id={id}
        initValues={initValues}
        initSpecification={initSpecification}
        initImages={products[id].images}
        buttonTitle='Update Product'
        handleSetProduct={updateProduct}
      />
    </AdminLayout>
  );
}

const mapStateToProps = (state, props) => ({
  products: productsSelector(state, props),
  loading: loadingProductsSelector(state)
});

export default connect(mapStateToProps, {loadProduct, updateProduct})(AdminProductUpdatePage);
