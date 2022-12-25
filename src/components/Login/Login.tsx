import classes from "./Login.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IState } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  loginUser: (
    obj: { user: { email: string; password: string } },
    cb: any
  ) => void;
}

type LoginForm = {
  email: string;
  password: string;
};

function Login(props: LoginProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

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
    mode: "onChange",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function handleForm(e: any) {
    props.loginUser({ user }, () => navigate(fromPage, { replace: true }));
    reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Sign in</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.input}>
          <label>
            Email address<br></br>
            <input
              style={{
                border: errors.email?.message ? "1px solid #F5222D" : "",
              }}
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
            Password<br></br>
            <input
              className={classes["input-line"]}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className={classes.footer}>
          <button className={classes.submit} type="submit">
            Login
          </button>
          <ToastContainer />
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
