import React from 'react';
import Footer from "./footer";
import SwitchBar from "./switchBar/SwitchBar";
import MainBar from "./mainBar";
import CategoryList from "./categoryList/CategoryList";
import Chat from "./chat";
import {PropTypes as Types} from "prop-types";
import {Helmet} from "react-helmet";

const Layout = ({children, pageTitle, pageDescription}) => (
  <>
    <Helmet>
      <title>{pageTitle || 'Store DigitalTech'}</title>
      <meta name="description" content={pageDescription || 'Store DigitalTech'} />
    </Helmet>
    <SwitchBar />
    <MainBar />
    <CategoryList/>
    <div className='flex-grow-1'>
      {children}
    </div>
    <Chat/>
    <Footer/>
  </>
);

Layout.propTypes = {
  children: Types.node
};

export default Layout;
