import React from 'react';
import Layout from "../components/Layout";
import OauthCallback from "../components/oauthCallback";

const OauthCallbackPage = () => (
  <Layout pageTitle="Oauth" pageDescription="Oauth">
    <OauthCallback />
  </Layout>
);

export default OauthCallbackPage;
