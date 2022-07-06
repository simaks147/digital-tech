import React, {useEffect} from 'react';
import AdminLayout from "../components/admin/AdminLayout";
import ProductUpdate from "../components/admin/productUpdate";
import {
  brandsListSelector,
  loadingProductsSelector,
  productsSelector,
  subcategoriesListSelector
} from "../redux/selectors";
import {connect} from "react-redux";
import {loadProduct} from "../redux/actions";
import Loader from "../components/loader";

const AdminProductUpdatePage = ({loadProduct, products, loading, match}) => {
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

  const initSpecification = Object.entries(products[id].specification).map(( spec, i) => {
    return {
      title: [spec[0]],
      desc: [spec[1]],
      num: Date.now() + i
    };
  });

  const initImages = products[id].images

  return (
    <AdminLayout>
      <ProductUpdate id={id} initValues={initValues} initSpecification={initSpecification} initImages={initImages}/>
    </AdminLayout>
  );
}

const mapStateToProps = (state, props) => ({
  brands: brandsListSelector(state),
  subcategories: subcategoriesListSelector(state),
  products: productsSelector(state, props),
  loading: loadingProductsSelector(state)
});

export default connect(mapStateToProps, {loadProduct})(AdminProductUpdatePage);
