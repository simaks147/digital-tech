import React from 'react';
import SwitchBar from "../switchBar";
import MainBar from "../mainBar";
import CategoryList from "../categoryList/CategoryList";

const Header = () => {
  return (
    <>
      <SwitchBar />
      <MainBar />
      <CategoryList/>
    </>
  );
};

export default Header;
