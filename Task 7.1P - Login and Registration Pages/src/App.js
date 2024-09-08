import React from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import {Routes, Route} from 'react-router-dom';
import LoginPage from './Routes/LoginPage.jsx';
import SignUpPage from './Routes/SignUpPage.jsx';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<SearchBar />}/>
      <Route path = 'login' element = {<LoginPage />}/>
      <Route path = 'signup' element = {<SignUpPage />}/>
    </Routes>
  );
}

export default App;
