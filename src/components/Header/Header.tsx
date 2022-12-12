import React from 'react';
import classes from './Header.module.scss';

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.heading}>Awesome blog</div>
      <div className={classes.actions}>
        <button className={classes.signin}>Sign in</button>
        <button className={classes.signup}>Sign up</button>
      </div>
    </div>
  );
}

export default Header;