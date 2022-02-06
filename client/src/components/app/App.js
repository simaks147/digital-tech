import React, {useEffect} from 'react';
import SwitchBar from "../switchBar";
import MainBar from "../mainBar";
import CategoryList from "../categoryList";
import AppRouter from "../AppRouter";
import {loadedCategoriesSelector, loadingCategoriesSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {loadCategories} from "../../redux/actions";
import Spinner from "react-bootstrap/Spinner";


const App = ({loadCategories, loading, loaded}) => {
  useEffect(() => {
    if (!loading && !loaded) loadCategories();
  }, [loadCategories, loading, loaded]);

  if (loading) return (
    <Spinner animation="border" role="status" className='categories-loader'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )

  if (!loaded) return 'Error!!!';

  return (
    <>
      <SwitchBar />
      <MainBar />
      <CategoryList/>
      <AppRouter/>
    </>
  );
}

const mapStateToProps = (state, props) => ({
  loading: loadingCategoriesSelector(state),
  loaded: loadedCategoriesSelector(state)
});

export default connect(mapStateToProps, {loadCategories})(App);
