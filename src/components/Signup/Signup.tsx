import React from "react";
import classes from "./Signup.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { IPost, IState, IRegisterUser } from "../../models";
import { useState } from "react";
import GetPosts from "../../services/service";
import { useForm } from "react-hook-form";

interface SignupProps {}

function Signup(props: SignupProps) {
  let getPosts = new GetPosts();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleSubmit(e: any) {
    let newUser: IRegisterUser = {
      username: user.username,
      email: user.email,
      password: user.password1,
    };
    e.preventDefault();
    getPosts.registerUser({ user: newUser });
    console.log("You clicked submit", user);
    setUser({ username: "", email: "", password1: "", password2: "" });
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>Create new account</div>
      <form onSubmit={handleSubmit}>
        <div className={classes.input}>
          <label>
            Username<br></br>
            <input
              className={classes["input-line"]}
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={user.username}
            />
          </label>
        </div>
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
              name="password1"
              placeholder="Password"
              onChange={handleChange}
              value={user.password1}
            />
          </label>
        </div>
        <div className={classes.input}>
          <label>
            Repeat Password<br></br>
            <input
              className={classes["input-line"]}
              type="password"
              name="password2"
              placeholder="Password"
              onChange={handleChange}
              value={user.password2}
            />
          </label>
        </div>
        <div className={classes.checkbox}>
          <label>
            <input name="agree" type="checkbox" />
            <div className={classes.label}>
              I agree to the processing of my personal information
            </div>
          </label>
        </div>
        <div className={classes.footer}>
          <button className={classes.submit} type="submit">
            Create
          </button>
        </div>
      </form>
      <div className={classes.signin}>
        Already have an account?
        <Link className={classes.link} to="/sign-in">
          {" "}
          Sign in.
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {};
};

export default connect(mapStateToProps, actions)(Signup);
