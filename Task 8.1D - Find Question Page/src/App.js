import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Routes/HomePage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import PostPage from './Routes/PostPage';
import QuestionsPage from './Routes/QuestionsPage';
import ArticlesPage from './Routes/ArticlesPage';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<HomePage />}/>
      <Route path = 'login' element = {<LoginPage />}/>
      <Route path = 'signup' element = {<SignUpPage />}/>
      <Route path = 'posting' element = {<PostPage />}/>
      <Route path = 'questions' element = {<QuestionsPage />}/>
      <Route path = 'articles' element = {<ArticlesPage />}/>
    </Routes>
  );
}

export default App;
