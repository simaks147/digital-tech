import React, {useEffect} from 'react';
import AppRouter from "../AppRouter";
import {loadedCategoriesSelector, loadingCategoriesSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadCategories} from "../../redux/actions";
import Loader from "../loader";


const App = ({loadCategories, loading, loaded}) => {
  useEffect(() => {
    if (!loading && !loaded) loadCategories();
  }, [loadCategories, loading, loaded]);

  if (loading) return <Loader/>;

  if (!loaded) return 'Error!!!';

  return (
    <>
      <AppRouter/>
    </>
  );
}

const mapStateToProps = (state, props) => ({
  loading: loadingCategoriesSelector(state),
  loaded: loadedCategoriesSelector(state)
});

export default connect(mapStateToProps, {loadCategories})(App);
