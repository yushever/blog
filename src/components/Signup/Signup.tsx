import React, { useRef } from "react";
import classes from "./Signup.module.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { IPost, IState, IRegisterUser } from "../../models";
import { useState } from "react";
import GetPosts from "../../services/service";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

interface SignupProps {}

type RegisterForm = {
  username: string;
  email: string;
  password1: string;
  password2: string;
  agree: boolean;
};

function Signup(props: SignupProps) {
  let getPosts = new GetPosts();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<RegisterForm>({
    mode: "onBlur",
  });

  const password1 = useRef({});
  password1.current = watch("password1", "");

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

  // function handleForm(e: any) {
  //   let newUser: IRegisterUser = {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password1,
  //   };
  //   e.preventDefault();
  //   getPosts.registerUser({ user: newUser });
  //   console.log("You clicked submit", user);
  //   reset();
  //   // setUser({ username: "", email: "", password1: "", password2: "" });
  // }

  function handleForm(data: any) {
    // let newUser: IRegisterUser = {
    //   username: user.username,
    //   email: user.email,
    //   password: user.password1,
    // };
    // e.preventDefault();
    // getPosts.registerUser({ user: newUser });
    console.log("You clicked submit", data);
    reset();
    // setUser({ username: "", email: "", password1: "", password2: "" });
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Create new account</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.input}>
          <label>
            Username<br></br>
            <input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username should be 3 to 20 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username should be 3 to 20 characters",
                },
              })}
              className={classes["input-line"]}
              type="text"
              placeholder="Username"
              // onChange={handleChange}
              // value={user.username}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.username && (
              <p className={classes["form-error"]}>
                {errors.username?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
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
              // name="email"
              placeholder="Email address"
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
              {...register("password1", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be 6 to 40 characters",
                },
                maxLength: {
                  value: 40,
                  message: "Password should be 6 to 40 characters",
                },
              })}
              className={classes["input-line"]}
              type="password"
              placeholder="Password"
              // onChange={handleChange}
              // value={user.password1}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.password1 && (
              <p className={classes["form-error"]}>
                {errors.password1?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={classes.input}>
          <label>
            Repeat Password<br></br>
            <input
              {...register("password2", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Username should be 6 to 40 characters",
                },
                maxLength: {
                  value: 40,
                  message: "Username should be 6 to 40 characters",
                },
                validate: (value) =>
                  value === password1.current || "The passwords do not match",
              })}
              className={classes["input-line"]}
              type="password"
              // name="password2"
              placeholder="Password"
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.password2 && (
              <p className={classes["form-error"]}>
                {errors.password2?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={classes.checkbox}>
          <label>
            <input
              type="checkbox"
              {...register("agree", {
                required: "You should accept the terms",
              })}
            />
            <div className={classes.label}>
              I agree to the processing of my personal information
            </div>
          </label>
          <div style={{ height: 0 }}>
            {errors?.agree && (
              <p className={classes["form-error"]}>
                {errors.agree?.message || "Error!"}
              </p>
            )}
          </div>
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
