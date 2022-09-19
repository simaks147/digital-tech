import React, {useEffect} from 'react';
import AppRouter from "../AppRouter";
import {
  loadedCategoriesSelector,
  loadingCategoriesSelector,
  loadedBrandsSelector,
  loadingBrandsSelector,
  tokenSelector,
  errorCategoriesSelector,
  errorBrandsSelector,
  errorProfileSelector,
  fetchingProfileSelector
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadCategories, loadBrands, fetchProfile} from "../../redux/actions";
import Loader from "../loader";
import {Alert} from "react-bootstrap";


const App = ({
               loadCategories,
               loadBrands,
               loadingCategories,
               loadedCategories,
               loadingBrands,
               loadedBrands,
               fetchingProfile,
               fetchProfile,
               errorsCategories,
               errorsBrands,
               errorsProfile,
               token,
             }) => {
  useEffect(() => {
    if (token) fetchProfile();
  }, [token, fetchProfile]);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  if (loadingCategories || loadingBrands) return <Loader/>;

  if (errorsCategories || errorsBrands || errorsProfile) return (
    <>
      {
        errorsCategories?.map((err, i) => (
          <Alert variant="danger" key={i}>{err}</Alert>
        ))
      }
      {
        errorsBrands?.map((err, i) => (
          <Alert variant="danger" key={i}>{err}</Alert>
        ))
      }
      {
        errorsProfile?.map((err, i) => (
          <Alert variant="danger" key={i}>{err}</Alert>
        ))
      }
    </>
  );

  if (!loadedCategories || !loadedBrands) return null;

  return <AppRouter/>;
}

const mapStateToProps = (state) => ({
  loadingCategories: loadingCategoriesSelector(state),
  loadedCategories: loadedCategoriesSelector(state),
  loadingBrands: loadingBrandsSelector(state),
  loadedBrands: loadedBrandsSelector(state),
  fetchingProfile: fetchingProfileSelector(state),
  errorsCategories: errorCategoriesSelector(state),
  errorsBrands: errorBrandsSelector(state),
  errorsProfile: errorProfileSelector(state),
  token: tokenSelector(state)
});

export default connect(mapStateToProps, {loadCategories, loadBrands, fetchProfile})(App);
