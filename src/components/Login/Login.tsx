import React from "react";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import GetPosts from "../../services/service";
import { useState } from "react";
import { IState } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface LoginProps {
  loginUser: (obj: { user: { email: string; password: string } }) => void;
}

function Login(props: LoginProps) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    props.loginUser({ user });
    console.log("You clicked submit", user);
    setUser({ email: "", password: "" });
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Sign in</div>
      <form onSubmit={handleSubmit}>
        <div className={classes.input}>
          <label>
            Email address<br></br>
            <input
              className={classes["input-line"]}
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
              value={user.email}
            />
          </label>
        </div>
        <div className={classes.input}>
          <label>
            Password<br></br>
            <input
              className={classes["input-line"]}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
            />
          </label>
        </div>
        <div className={classes.footer}>
          <button className={classes.submit} type="submit">
            Login
          </button>
        </div>
      </form>
      <div className={classes.signin}>
        Don't have an account?
        <Link className={classes.link} to="/sign-up">
          {" "}
          Sign up.
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(Login);
