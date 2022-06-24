import React, {useEffect} from 'react';
import AppRouter from "../AppRouter";
import {
  loadedCategoriesSelector,
  loadingCategoriesSelector,
  loadedBrandsSelector,
  loadingBrandsSelector,
  tokenSelector
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadCategories, loadBrands, fetchProfile} from "../../redux/actions";
import Loader from "../loader";


const App = ({
               loadCategories,
               loadBrands,
               loadingCategories,
               loadedCategories,
               loadingBrands,
               loadedBrands,
               token,
               fetchProfile
             }) => {
  useEffect(() => {
    if (token) fetchProfile();
  }, [token, fetchProfile]);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  if (loadingCategories || loadingBrands) return <Loader/>;

  if (!loadedCategories || !loadedBrands) return 'Error!!!';

  return <AppRouter/>;
}

const mapStateToProps = (state, props) => ({
  loadingCategories: loadingCategoriesSelector(state),
  loadedCategories: loadedCategoriesSelector(state),
  loadingBrands: loadingBrandsSelector(state),
  loadedBrands: loadedBrandsSelector(state),
  token: tokenSelector(state),
});

export default connect(mapStateToProps, {loadCategories, loadBrands, fetchProfile})(App);
