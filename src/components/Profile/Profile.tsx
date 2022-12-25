import React, { useRef } from "react";
import classes from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { IState, IEditUser } from "../../models";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ILoggedUser } from "../../models";

interface ProfileProps {
  loggedInUser?: ILoggedUser;
  editUser: (obj: { user: IEditUser }, token: string) => void;
}

type ProfileForm = {
  username?: string;
  email?: string;
  password: string;
  avatar?: string;
};

function Profile(props: ProfileProps) {
  const navigate = useNavigate();
  var loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ProfileForm>({
    defaultValues: {
      username: props.loggedInUser?.username,
      email: props.loggedInUser?.email,
      password: props.loggedInUser?.password,
      avatar: props.loggedInUser?.image,
    },
    mode: "onBlur",
  });

  const [user, setUser] = useState({
    username: props.loggedInUser?.username,
    email: props.loggedInUser?.email,
    password: "",
    avatar: props.loggedInUser?.image,
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleForm(e: any) {
    let edittingUser: IEditUser = {
      username: user.username,
      email: user.email,
      password: user.password,
      image: user.avatar,
      bio: props.loggedInUser?.bio,
    };
    props.editUser({ user: edittingUser }, props.loggedInUser?.token as string);
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Edit Profile</div>
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
              onChange={handleChange}
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
              placeholder="Email address"
              onChange={handleChange}
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
            New password<br></br>
            <input
              {...register("password", {
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
              placeholder="New Password"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.password && (
              <p className={classes["form-error"]}>
                {errors.password?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={classes.input}>
          <label>
            Avatar image (url)<br></br>
            <input
              {...register("avatar")}
              className={classes["input-line"]}
              type="text"
              placeholder="Avatar image"
              onChange={handleChange}
            />
          </label>
          {/* <div style={{ height: 20 }}>
            {errors?.username && (
              <p className={classes["form-error"]}>
                {errors.username?.message || "Error!"}
              </p>
            )}
          </div> */}
        </div>
        <div className={classes.footer}>
          <button className={classes.submit} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(Profile);
