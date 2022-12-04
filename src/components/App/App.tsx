import React from 'react';
import './App.module.scss';
import Header from '../Header/Header'
import Login from '../Login/Login';
import Signup from '../Signup/Signup'
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts'

function App() {
  return (
    <div>
      <Header />
      <Login />
      <Profile />
      <Signup />
      <Posts />
    </div>
  );
}

export default App;
