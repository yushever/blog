import React from 'react';
import classes from './Header.module.scss';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.heading}>Awesome blog</div>
      <div className={classes.actions}>
        <button className={classes.signin}><Link className={classes.link} to="/sign-in">Sign in</Link></button>
        <button className={classes.signup}><Link className={classes.link} to="/sign-up">Sign up</Link></button>
      </div>
    </div>
  );
}

export default Header;