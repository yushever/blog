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
import NewPost from "../NewPost/NewPost";
import EditPost from "../EditPost/EditPost";

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

  return (
    <div>
      <Header />
      <div className={classes.content}>
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/new-article" element={<NewPost />} />
          <Route path="/posts/:slug" element={<OpenedPost />} />
          <Route path="/articles/:slug/edit" element={<EditPost />} />
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
