import React, { useState } from "react";
import "./Posts.module.scss";
import Post from "./Post/Post";
import { IPost, IState, ILoggedUser } from "../../models";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Pagination, Spin, Alert } from "antd";
import classes from "./Posts.module.scss";
import { Link } from "react-router-dom";

// import 'antd/dist/antd.css';

interface PostsProps {
  getPostsByPage: (page: number, token?: string) => void;
  posts: [];
  pageNumber: number;
  articlesCount: number;
  loading: boolean;
  error: boolean;
  loggedInUser?: ILoggedUser;
}

function Posts(props: PostsProps) {
  let el: IPost[] = props.posts;

  let elements = el.map((post: IPost) => {
    return (
      <Link key={post.slug} to={`/posts/${post.slug}`}>
        <Post post={post} slug={post.slug} />
      </Link>
      // <div key={post.slug}>
      //   <Post post={post} slug={post.slug} />
      // </div>
    );
  });
  let error = props.error ? (
    <Alert message="Something went wrong" type="error" />
  ) : null;
  let loader = props.loading ? <Spin className={classes.spinner} /> : null;
  let pagination =
    !props.loading && !props.error ? (
      <Pagination
        defaultPageSize={5}
        showSizeChanger={false}
        onChange={(e) => props.getPostsByPage(e, props.loggedInUser?.token)}
        total={props.articlesCount}
      />
    ) : null;

  return (
    <div className={classes.container}>
      {error}
      {loader}
      {elements}
      <div className={classes.pagination}>{pagination}</div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    posts: state.posts,
    pageNumber: state.pageNumber,
    articlesCount: state.articlesCount,
    loading: state.loading,
    loggedInUser: state.loggedInUser,
    error: state.error,
  };
};

export default connect(mapStateToProps, actions)(Posts);
