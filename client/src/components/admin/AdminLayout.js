import React, {useEffect} from 'react';
import Footer from "../footer";
import SwitchBar from "../switchBar/SwitchBar";
import {Container} from "react-bootstrap";
import Logo from "../logo";
import {fetchProfile} from "../../redux/actions";
import {isAdminProfileSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";

const AdminLayout = ({children, isAdmin, fetchProfile}) => {
  useEffect(() => {
    if (isAdmin) fetchProfile();
  }, [isAdmin, fetchProfile]);

  if (!isAdmin) return <Redirect to={HOME_ROUTE}/>;

  return <>
    <SwitchBar/>
    <Container className='mt-4'>
      <Logo/>
    </Container>
    <div className='flex-grow-1'>
      {children}
    </div>
    <Footer/>
  </>
}

const mapStateToProps = (state) => ({
  isAdmin: isAdminProfileSelector(state)
});

export default connect(mapStateToProps, {fetchProfile})(AdminLayout);
