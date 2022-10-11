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
  checkedProfileSelector
} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadCategories, loadBrands, fetchProfile} from "../../redux/actions";
import Loader from "../loader";
import {Alert} from "react-bootstrap";
import {PropTypes as Types} from "prop-types";

const App = ({
               loadCategories,
               loadBrands,
               loadingCategories,
               loadedCategories,
               loadingBrands,
               loadedBrands,
               fetchProfile,
               errorsCategories,
               errorsBrands,
               errorsProfile,
               checkedProfile
             }) => {
  // useEffect(() => {
  //   if (token) fetchProfile();
  // }, [token, fetchProfile]);

  useEffect(() => {
    loadCategories();
    loadBrands();
    fetchProfile();
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

  if (!loadedCategories || !loadedBrands || !checkedProfile) return null;

  return <AppRouter/>;
}

const mapStateToProps = (state) => ({
  loadingCategories: loadingCategoriesSelector(state),
  loadedCategories: loadedCategoriesSelector(state),
  loadingBrands: loadingBrandsSelector(state),
  loadedBrands: loadedBrandsSelector(state),
  errorsCategories: errorCategoriesSelector(state),
  errorsBrands: errorBrandsSelector(state),
  errorsProfile: errorProfileSelector(state),
  token: tokenSelector(state),
  checkedProfile: checkedProfileSelector(state)
});

App.propTypes = {
  loadingCategories: Types.bool.isRequired,
  loadedCategories: Types.bool.isRequired,
  loadingBrands: Types.bool.isRequired,
  loadedBrands: Types.bool.isRequired,
  errorsCategories: Types.arrayOf(Types.string),
  errorsBrands: Types.arrayOf(Types.string),
  errorsProfile: Types.arrayOf(Types.string),
  token: Types.string,
  loadCategories: Types.func.isRequired,
  loadBrands: Types.func.isRequired,
  fetchProfile: Types.func.isRequired
};

export default connect(mapStateToProps, {loadCategories, loadBrands, fetchProfile})(App);
