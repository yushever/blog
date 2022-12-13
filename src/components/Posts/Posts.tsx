import React from 'react';
import './Posts.module.scss';
import Post from "./Post/Post"
import { IPost, IState } from '../../models';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import classes from './Posts.module.scss';
import { Link } from 'react-router-dom';
// import 'antd/dist/antd.css';

interface PostsProps {
  getPostsByPage: (page: number) => void;
  posts: [];
  pageNumber: number;
  articlesCount: number;
}

function Posts(props: PostsProps) {
  let el: IPost[] = props.posts;

  let elements = el.map((post: IPost) => {
    return (

      <Link key={post.slug} to={`/posts/${post.slug}`}>
        <Post post={post} />
      </Link>
    )
  });
  return (
    <div>
      {elements}
      <div className={classes.pagination}>
        <Pagination defaultPageSize={5} showSizeChanger={false} onChange={props.getPostsByPage} total={props.articlesCount} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    posts: state.posts,
    pageNumber: state.pageNumber,
    articlesCount: state.articlesCount,
  };
};

export default connect(mapStateToProps, actions)(Posts);