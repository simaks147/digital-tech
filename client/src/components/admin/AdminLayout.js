import React from 'react';
import Footer from "../footer";
import SwitchBar from "../switchBar/SwitchBar";
import {Container} from "react-bootstrap";
import Logo from "../logo";

const AdminLayout = ({children}) => (
  <>
    <SwitchBar/>
    <Container className='mt-4'>
      <Logo/>
    </Container>
    <div className='flex-grow-1'>
      {children}
    </div>
    <Footer/>
  </>
);

export default AdminLayout;
