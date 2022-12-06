import React from 'react';
import './Posts.module.scss';
import Post from "./Post/Post"
import { IPost, IState } from '../../models';
import * as actions from '../../actions';
import { connect } from 'react-redux';


function Posts(props: IState) {
  let el: IPost[] = props.posts;

  let elements = el.map((post: IPost) => {
    return (
      <div key={post.slug}>
        <Post post={post} />
      </div>
    )
  });
  return (
    <div>
      {elements}
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    posts: state.posts,
  };
};

export default connect(mapStateToProps, actions)(Posts);