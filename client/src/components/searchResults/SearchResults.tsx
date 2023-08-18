import React, { FC, useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { loadProductsBySearch } from "../../redux/actions";
import {
  errorSearchSelector,
  loadingProductsSelector,
  routerSelector,
  searchListSelector
} from "../../redux/selectors";
import Loader from "../loader";
import styles from "./searchResults.module.css";
import { Alert, Container } from "react-bootstrap";
import SearchItem from "./searchItem";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

const SearchResults: FC<IProps> = ({ products, loading, errors, router, loadProductsBySearch }) => {
  const query = decodeURIComponent(router.location.query.query);

  useEffect(() => {
    loadProductsBySearch();
  }, [query]);

  if (errors)
    return <div className={styles.section}>
      <Container>
        {
          errors.map((err, i) => (
            <Alert variant="danger" key={i}>{err}</Alert>
          ))
        }
      </Container>
    </div>

  if (loading) return <Loader />;

  return (
    <div className={styles.section}>
      <Container>
        {
          products.length !== 0 &&
          <>
            <div className={styles.header}>Results for search "<span>{query}</span>"</div>
            <div>
              {
                products.map(item => <SearchItem key={item.slug} product={item} />)
              }
            </div>
          </>
        }
        {
          products.length === 0 && <div className={styles.header}>No results for search "<span>{query}</span>"</div>
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  products: searchListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorSearchSelector(state),
  router: routerSelector(state)
});

const connector = connect(mapStateToProps, { loadProductsBySearch });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SearchResults);
