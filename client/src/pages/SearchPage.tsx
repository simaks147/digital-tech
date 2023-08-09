import React from 'react';
import Layout from "../components/Layout";
import SearchResults from "../components/searchResults";

const SearchPage = () => (
  <Layout pageTitle="Search" pageDescription="Search">
    <SearchResults/>
  </Layout>
);

export default SearchPage;
