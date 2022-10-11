import React from 'react';
import Footer from "../footer";
import SwitchBar from "../switchBar/SwitchBar";
import {Container} from "react-bootstrap";
import Logo from "../logo";
import {PropTypes as Types} from "prop-types";

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

AdminLayout.propTypes = {
  children: Types.node
};

export default AdminLayout;
