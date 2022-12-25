import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '../Header/Header';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import * as actions from '../../actions';
import OpenedPost from '../OpenedPost/OpenedPost';
import { ILoggedUser, IState } from '../../models';
import NewPost from '../NewPost/NewPost';
import EditPost from '../EditPost/EditPost';
import RequireAuth from '../hoc/RequireAuth';

import classes from './App.module.scss';
import 'react-toastify/dist/ReactToastify.css';

interface AppProps {
  getPosts: (token?: string) => void;
  login: (user: ILoggedUser) => void;
  loggedInUser?: ILoggedUser;
}

function App(props: AppProps) {
  if (!props.loggedInUser) {
    let loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      props.login(JSON.parse(loggedUser));
    }
  }

  props.getPosts(props.loggedInUser?.token);

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className={classes.content}>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <NewPost />
              </RequireAuth>
            }
          />
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
