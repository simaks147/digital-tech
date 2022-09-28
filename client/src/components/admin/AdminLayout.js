import React, {useEffect} from 'react';
import Footer from "../footer";
import SwitchBar from "../switchBar/SwitchBar";
import {Container} from "react-bootstrap";
import Logo from "../logo";
import {fetchProfile} from "../../redux/actions";
import {dataProfileSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import {PropTypes as Types} from "prop-types";

const AdminLayout = ({children, dataProfile, fetchProfile}) => {
  useEffect(() => {
    if (dataProfile.isAdmin) fetchProfile();
  }, [dataProfile.isAdmin, fetchProfile]);

  if (!dataProfile.isAdmin) return <Redirect to={HOME_ROUTE}/>;

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

AdminLayout.propTypes = {
  children: Types.node,
  dataProfile: Types.shape({
    isAdmin: Types.bool.isRequired
  }).isRequired,
  fetchProfile: Types.func.isRequired
};

const mapStateToProps = (state) => ({
  dataProfile: dataProfileSelector(state)
});

export default connect(mapStateToProps, {fetchProfile})(AdminLayout);
