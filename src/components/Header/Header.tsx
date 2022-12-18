import React from "react";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import { IState, ILoggedUser } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface HeaderProps {
  loggedInUser?: ILoggedUser;
}

function Header(props: HeaderProps) {
  if (props.loggedInUser) {
    console.log("Yes there is logged in user");
  } else {
    console.log("No user found");
  }
  return (
    <div className={classes.header}>
      <div className={classes.heading}>Awesome blog</div>

      {props.loggedInUser ? (
        <div className={classes.logged}>
          <button className={classes.create}>Create article</button>
          <div className={classes.user}>
            <div className={classes.username}>
              {props.loggedInUser.username}
            </div>
            <div className={classes["user-img"]}>
              <img
                className={classes.avatar}
                src={props.loggedInUser.image}
                alt="avatar"></img>
            </div>
          </div>
          <button className={classes.logout}>Log out</button>
        </div>
      ) : (
        <div className={classes.actions}>
          <button className={classes.signin}>
            <Link className={classes.link} to="/sign-in">
              Sign in
            </Link>
          </button>
          <button className={classes.signup}>
            <Link className={classes.link} to="/sign-up">
              Sign up
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(Header);
