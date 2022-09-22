import React from 'react';
// import Header from "./header";
import Footer from "./footer";
import SwitchBar from "./switchBar/SwitchBar";
import MainBar from "./mainBar";
import CategoryList from "./categoryList/CategoryList";
import Chat from "./chat";

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

export default Layout;
