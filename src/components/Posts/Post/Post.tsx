import React from 'react';
import classes from './Post.module.scss';
import { HeartOutlined } from '@ant-design/icons';

function Post() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes["header-info"]}>
          <div className={classes.heading}>
            <h2 className={classes.name}>Some article title</h2>
            {/* <HeartOutlined style={{ fontSize: '18px', color: '#black' }} />
            <HeartOutlined style={{ fontSize: '18px', color: '#FF0000' }} /> */}
            <button className={classes.likes}>11</button>
          </div>
          <div className={classes.tags}>
            Tag
          </div>
        </div>
        <div className={classes["header-user"]}>
          <div className={classes["user-info"]}>
            <div className={classes.user}>John Doe</div>
            <div className={classes.data}>March 5, 2020</div>
          </div>
          <div className={classes["user-img"]}>
            <img
              className={classes.avatar}
              src="../../../../images/avatar.jpg"
              alt="avatar"
            ></img>
          </div>
        </div>

      </div>
      <div className={classes.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </div >
  );
}

export default Post;