import React, { FC, useEffect } from 'react';
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
import { connect, ConnectedProps } from "react-redux";
import { loadCategories, loadBrands, fetchProfile } from "../../redux/actions";
import Loader from "../loader";
import { Alert } from "react-bootstrap";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const App: FC<IProps> = ({
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
  token,
  checkedProfile
}) => {
  useEffect(() => {
    fetchProfile();
  }, [token]);

  useEffect(() => {
    loadCategories();
    loadBrands();
  }, []);

  if (loadingCategories || loadingBrands || !checkedProfile) return <Loader />;

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

  return <AppRouter />;
}

const mapStateToProps = (state: RootStateType) => ({
  loadingCategories: loadingCategoriesSelector(state),
  loadedCategories: loadedCategoriesSelector(state),
  loadingBrands: loadingBrandsSelector(state),
  loadedBrands: loadedBrandsSelector(state),
  errorsCategories: errorCategoriesSelector(state),
  errorsBrands: errorBrandsSelector(state),
  errorsProfile: errorProfileSelector(state),
  token: tokenSelector(state),
  checkedProfile: checkedProfileSelector(state),
});

const connector = connect(mapStateToProps, { loadCategories, loadBrands, fetchProfile });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App);
