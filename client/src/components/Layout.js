import React from 'react';
// import Header from "./header";
import Footer from "./footer";
import SwitchBar from "./switchBar/SwitchBar";
import MainBar from "./mainBar";
import CategoryList from "./categoryList/CategoryList";

const Layout = ({children}) => (
  <>
    <SwitchBar />
    <MainBar />
    <CategoryList/>
    <div className='flex-grow-1'>
      {children}
    </div>
    <Footer/>
  </>
);

export default Layout;
