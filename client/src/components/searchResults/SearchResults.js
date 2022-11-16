import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadProductsBySearch} from "../../redux/actions";
import {
  errorSearchSelector,
  loadingProductsSelector,
  routerSelector,
  searchListSelector
} from "../../redux/selectors";
import Loader from "../loader";
import styles from "./searchResults.module.css";
import {Alert, Container} from "react-bootstrap";
import SearchItem from "./searchItem";

const SearchResults = ({products, loading, errors, router, loadProductsBySearch}) => {
  useEffect(() => {
    loadProductsBySearch();
  }, [router.location.query]);

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

  if (loading) return <Loader/>;

  return (
    <div className={styles.section}>
      <Container>
        {
          products.map(item => <SearchItem key={item.slug} product={item}/>)
        }
      </Container>
    </div>
  );
};

// SearchResults.propTypes = {
//
// };

const mapStateToProps = (state) => ({
  products: searchListSelector(state),
  loading: loadingProductsSelector(state),
  errors: errorSearchSelector(state),
  router: routerSelector(state)
});

export default connect(mapStateToProps, {loadProductsBySearch})(SearchResults);
