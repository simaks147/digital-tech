import React, { FC, useEffect } from 'react';
import AppRouter from "../AppRouter";
import styles from './app.module.css';
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
import useDelay from '../../hooks/use-delay';
import Chat from '../chat/Chat';
import SwitchBar from '../switchBar';
import Footer from '../footer';

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

  const showMessage = useDelay(5000);

  if (loadingCategories || loadingBrands || !checkedProfile) return (
    <>
      {
        showMessage && <div className={styles.message}>The hosting has a <span>free</span> plan and if did not respond to requests for more than 15 minutes, then service stop. It will take time to resume service, which will <span>delay</span> first page loading. Please <span>wait...</span></div>
      }
      <Loader />
    </>
  );

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

  return <>
    <SwitchBar />
    <AppRouter />
    <Chat />
    <Footer />
  </>;
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
