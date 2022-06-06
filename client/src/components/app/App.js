import React, {useEffect} from 'react';
import AppRouter from "../AppRouter";
import {loadedCategoriesSelector, loadingCategoriesSelector, tokenSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadCategories, fetchProfile} from "../../redux/actions";
import Loader from "../loader";


const App = ({loadCategories, loading, loaded, token, fetchProfile}) => {
  useEffect(() => {
    if (token) fetchProfile();
  }, [token, fetchProfile]);

  useEffect(() => {
    if (!loading && !loaded) loadCategories();
  }, [loadCategories, loading, loaded]);

  if (loading) return <Loader/>;

  if (!loaded) return 'Error!!!';

  return <AppRouter/>;
}

const mapStateToProps = (state, props) => ({
  loading: loadingCategoriesSelector(state),
  loaded: loadedCategoriesSelector(state),
  token: tokenSelector(state)
});

export default connect(mapStateToProps, {loadCategories, fetchProfile})(App);
