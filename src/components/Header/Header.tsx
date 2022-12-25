import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { IState, ILoggedUser } from '../../models';
import * as actions from '../../actions';

import classes from './Header.module.scss';

interface HeaderProps {
  loggedInUser?: ILoggedUser;
  logout: () => void;
}

function Header(props: HeaderProps) {
  return (
    <div className={classes.header}>
      <Link className={classes.link} to="/posts">
        <div className={classes.heading}>Awesome blog</div>
      </Link>
      {props.loggedInUser ? (
        <div className={classes.logged}>
          <button className={classes.create}>
            <Link className={classes.link} to="/new-article">
              Create article
            </Link>
          </button>
          <Link className={classes.link} to="/profile">
            <div className={classes.user}>
              <div className={classes.username}>{props.loggedInUser.username}</div>
              <div className={classes['user-img']}>
                <img className={classes.avatar} src={props.loggedInUser.image} alt="avatar"></img>
              </div>
            </div>
          </Link>
          <button onClick={() => props.logout()} className={classes.logout}>
            <Link className={classes.link} to="/sign-in">
              Log out
            </Link>
          </button>
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
