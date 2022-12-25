import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import * as actions from '../../actions';
import { IRegisterUser } from '../../models';
import GetPosts from '../../services/service';

import classes from './Signup.module.scss';
import 'react-toastify/dist/ReactToastify.css';

type RegisterForm = {
  username: string;
  email: string;
  password1: string;
  password2: string;
  agree: boolean;
};

function Signup() {
  const navigate = useNavigate();

  let getPosts = new GetPosts();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm<RegisterForm>({
    mode: 'onChange',
  });

  const password1 = useRef({});
  password1.current = watch('password1', '');

  const [user, setUser] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setUser(() => ({ ...user, [name]: value }));
  }

  function handleForm() {
    let newUser: IRegisterUser = {
      username: user.username,
      email: user.email,
      password: user.password1,
    };
    getPosts
      .registerUser({ user: newUser })
      .then(() => {
        toast.success('Registration successful!');
        navigate('/sign-in');
      })
      .catch(() => {
        toast.error('Something went wrong. Please try again.');
      });
    reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Create new account</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.input}>
          <label>
            Username<br></br>
            <input
              style={{
                border: errors.username?.message ? '1px solid #F5222D' : '',
              }}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username should be 3 to 20 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Username should be 3 to 20 characters',
                },
              })}
              className={classes['input-line']}
              type="text"
              placeholder="Username"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.username && <p className={classes['form-error']}>{errors.username?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.input}>
          <label>
            Email address<br></br>
            <input
              style={{
                border: errors.email?.message ? '1px solid #F5222D' : '',
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email',
                },
              })}
              className={classes['input-line']}
              type="text"
              placeholder="Email address"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.email && <p className={classes['form-error']}>{errors.email?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.input}>
          <label>
            Password<br></br>
            <input
              style={{
                border: errors.password1?.message ? '1px solid #F5222D' : '',
              }}
              {...register('password1', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be 6 to 40 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Password should be 6 to 40 characters',
                },
              })}
              className={classes['input-line']}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.password1 && <p className={classes['form-error']}>{errors.password1?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.input}>
          <label>
            Repeat Password<br></br>
            <input
              style={{
                border: errors.password2?.message ? '1px solid #F5222D' : '',
              }}
              {...register('password2', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Username should be 6 to 40 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'Username should be 6 to 40 characters',
                },
                validate: (value) => value === password1.current || 'The passwords do not match',
              })}
              className={classes['input-line']}
              type="password"
              placeholder="Password"
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.password2 && <p className={classes['form-error']}>{errors.password2?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.checkbox}>
          <label>
            <input
              type="checkbox"
              {...register('agree', {
                required: 'You should accept the terms',
              })}
            />
            <div className={classes.label}>I agree to the processing of my personal information</div>
          </label>
          <div style={{ height: 0 }}>
            {errors?.agree && <p className={classes['form-error']}>{errors.agree?.message || 'Error!'}</p>}
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
          {' '}
          Sign in.
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, actions)(Signup);
