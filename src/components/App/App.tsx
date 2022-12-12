import './App.module.scss';
import Header from '../Header/Header'
import Login from '../Login/Login';
import Signup from '../Signup/Signup'
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import GetPosts from "../../services/service";
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import classes from './App.module.scss';
import OpenedPost from '../OpenedPost/OpenedPost';


interface AppProps {
  getPosts: () => void;
}

function App(props: AppProps) {
  props.getPosts();

  // const [postsData, setPosts] = useState({});
  // let getPosts = new GetPosts();
  // getPosts.getAllPosts().then((res) => setPosts(res));
  // console.log(postsData);

  // useEffect(() => {
  //   const newPosts = getPosts.getAllPosts().then((res) => setPosts(res))
  // }, []);
  // console.log(postsData);

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <OpenedPost />
        <Login />
        <Profile />
        <Signup />
        <Posts />
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, actions)(App);