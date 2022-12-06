import React from 'react';
import classes from './Post.module.scss';
import { HeartOutlined } from '@ant-design/icons';
import { IPost } from "../../../models"
import { format } from 'date-fns';


interface PostProps {
  post: IPost;
}

function Post(props: PostProps) {

  const mapTags = (tags: string[]) => {
    return tags.map((tag) => {
      return (<div className={classes.tag} key={Math.random()}>{tag}</div>);
    })
  }

  const publishDate = format(new Date(props.post.createdAt), 'PPP');
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes["header-info"]}>
          <div className={classes.heading}>
            <h2 className={classes.name}>{props.post.title}</h2>
            {/* <HeartOutlined style={{ fontSize: '18px', color: '#black' }} />
            <HeartOutlined style={{ fontSize: '18px', color: '#FF0000' }} /> */}
            <button className={classes.likes}>{props.post.favoritesCount}</button>
          </div>
          <div className={classes.tags}>
            {mapTags(props.post.tagList)}
          </div> 
        </div>
        <div className={classes["header-user"]}>
          <div className={classes["user-info"]}>
            <div className={classes.user}>{props.post.author.username}</div>
            <div className={classes.data}>{publishDate}</div>
          </div>
          <div className={classes["user-img"]}>
            <img
              className={classes.avatar}
              src={props.post.author.image}
              alt="avatar"
            ></img>
          </div>
        </div>

      </div>
      <div className={classes.text}>
      {props.post.description}
      </div>
    </div >
  );
}

export default Post;