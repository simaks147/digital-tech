import React, { FC, ReactNode } from 'react';
import Footer from "./footer";
import SwitchBar from "./switchBar/SwitchBar";
import MainBar from "./mainBar";
import CategoryList from "./categoryList/CategoryList";
import Chat from "./chat";
import { Helmet } from "react-helmet";

interface IProps {
  children?: ReactNode,
  pageTitle: string,
  pageDescription: string
}

const Layout: FC<IProps> = ({ children, pageTitle, pageDescription }) => (
  <>
    <Helmet>
      <title>{pageTitle || 'Store DigitalTech'}</title>
      <meta name="description" content={pageDescription || 'Store DigitalTech'} />
    </Helmet>
    <SwitchBar />
    <MainBar />
    <CategoryList />
    <div className='flex-grow-1'>
      {children}
    </div>
    <Chat />
    <Footer />
  </>
);

export default Layout;
