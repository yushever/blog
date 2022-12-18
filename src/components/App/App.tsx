import "./App.module.scss";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";
import Posts from "../Posts/Posts";
import GetPosts from "../../services/service";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import classes from "./App.module.scss";
import OpenedPost from "../OpenedPost/OpenedPost";
import { Routes, Route } from "react-router-dom";
import { ILoggedUser, IState } from "../../models";

interface AppProps {
  getPosts: () => void;
  login: (user: ILoggedUser) => void;
  loggedInUser?: ILoggedUser;
}

function App(props: AppProps) {
  if (!props.loggedInUser) {
    let loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      props.login(JSON.parse(loggedUser));
    }
  }

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
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:slug" element={<OpenedPost />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(App);
