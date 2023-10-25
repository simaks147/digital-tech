import React, { FC, ReactNode } from 'react';
import MainBar from "./mainBar";
import CategoryList from "./categoryList/CategoryList";
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
    <MainBar />
    <CategoryList />
    <div className='flex-grow-1'>
      {children}
    </div>
  </>
);

export default Layout;
