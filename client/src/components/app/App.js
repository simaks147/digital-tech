import React from 'react';
import SwitchBar from "../switchBar";
import MainBar from "../mainBar";
import CategoryList from "../categoryList";
import AppRouter from "../AppRouter";


const App = () => (
  <>
    <SwitchBar />
    <MainBar />
    <CategoryList/>
    <AppRouter/>
  </>
);

export default App;
