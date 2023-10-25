import React, { FC, ReactNode } from 'react';
import { Container } from "react-bootstrap";
import Logo from "../logo";
import { Helmet } from "react-helmet";

interface IProps {
  children?: ReactNode,
  pageTitle: string,
  pageDescription: string
}

const AdminLayout: FC<IProps> = ({ children, pageTitle, pageDescription }) => (
  <>
    <Helmet>
      <title>{pageTitle || 'Admin | Store DigitalTech'}</title>
      <meta name="description" content={pageDescription || 'Admin | Store DigitalTech'} />
    </Helmet>
    <Container className='mt-4'>
      <Logo />
    </Container>
    <div className='flex-grow-1'>
      {children}
    </div>
  </>
);

export default AdminLayout;
