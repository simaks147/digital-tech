import React from 'react';
import SwitchBar from "../switchBar";
import MainBar from "../mainBar";
import CategoryList from "../categoryList";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "../AppRouter";


const App = () => (
  <BrowserRouter>
    <SwitchBar />
    <MainBar />
    <CategoryList/>
    {/*<Slider />*/}
    <AppRouter/>
  </BrowserRouter>
);

export default App;
