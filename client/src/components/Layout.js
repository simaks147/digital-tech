import React from 'react';
import Footer from "./footer";
import SwitchBar from "./switchBar/SwitchBar";
import MainBar from "./mainBar";
import CategoryList from "./categoryList/CategoryList";
import Chat from "./chat";
import {PropTypes as Types} from "prop-types";

const Layout = ({children}) => (
  <>
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
