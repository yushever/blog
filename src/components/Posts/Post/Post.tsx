import React, { useState } from "react";
import classes from "./Post.module.scss";
import { IPost, ILoggedUser, IState } from "../../../models";
import { format } from "date-fns";
import GetPosts from "../../../services/service";
import { connect } from "react-redux";
import * as actions from "../../../actions";

interface PostProps {
  post: IPost;
  loggedInUser?: ILoggedUser;
  slug: string;
  like: (token: string, slug: string, like: boolean) => void;
}

function Post(props: PostProps) {
  // let getPosts = new GetPosts();

  // let likeArticle = (token: any, slug: any) => {
  //   getPosts.likePost(token, slug);
  //   console.log("liked!");
  // };

  // let dislikeArticle = (token: any, slug: any) => {
  //   getPosts.dislikePost(token, slug);
  //   console.log("disliked!");
  // };

  const mapTags = (tags: string[]) => {
    return tags.slice(0, 3).map((tag) => {
      if (tag) {
        return (
          <div className={classes.tag} key={tag}>
            {tag.slice(0, 10)}
          </div>
        );
      }
      return null;
    });
  };

  const publishDate = format(new Date(props.post.createdAt), "PPP");
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes["header-info"]}>
          <div className={classes.heading}>
            <div className={classes.name}>{props.post.title.slice(0, 44)}</div>
            <button
              disabled={!props.loggedInUser ? true : false}
              className={`${
                props.post.favorited ? classes.liked : classes.likes
              }`}
              onClick={() => {
                if (!props.post.favorited) {
                  props.like(
                    props.loggedInUser?.token as string,
                    props.slug,
                    true
                  );
                } else {
                  props.like(
                    props.loggedInUser?.token as string,
                    props.slug,
                    false
                  );
                }
              }}>
              {props.post.favoritesCount}
            </button>
          </div>
          <div className={classes.tags}>{mapTags(props.post.tagList)}</div>
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
              alt="avatar"></img>
          </div>
        </div>
      </div>
      <div className={classes.text}>{props.post.description.slice(0, 204)}</div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(Post);
