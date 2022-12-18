import React from "react";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import GetPosts from "../../services/service";
import { useState } from "react";
import { IState } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { useForm } from "react-hook-form";

interface LoginProps {
  loginUser: (obj: { user: { email: string; password: string } }) => void;
}

type LoginForm = {
  email: string;
  password: string;
};

function Login(props: LoginProps) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginForm>({
    mode: "onBlur",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleForm(e: any) {
    // e.preventDefault();
    props.loginUser({ user });
    console.log("You clicked submit", user);
    // localStorage.setItem("user", JSON.stringify(user));
    reset();
    // setUser({ email: "", password: "" });
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Sign in</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.input}>
          <label>
            Email address<br></br>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              className={classes["input-line"]}
              type="text"
              placeholder="Email address"
              onChange={handleChange}
              // value={user.email}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.email && (
              <p className={classes["form-error"]}>
                {errors.email?.message || "Error!"}
              </p>
            )}
          </div>
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
              // value={user.password}
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
