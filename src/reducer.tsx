import { Reducer } from 'redux';

import * as actions from './actions';
import { IState, IPost } from './models';

const reducer: Reducer = (
  state: IState = {
    posts: [],
    loggedInUser: undefined,
    articlesCount: 0,
    pageNumber: 1,
    loading: true,
    error: false,
  },
  action: { type?: string; payload?: any } = {}
) => {
  switch (action.type) {
    case actions.SET: {
      return {
        ...state,
        posts: action.payload.posts,
        articlesCount: action.payload.articlesCount,
        loading: false,
        error: false,
      };
    }
    case actions.LOGIN: {
      return {
        ...state,
        loggedInUser: action.payload.user,
      };
    }
    case actions.LOGOUT: {
      return {
        ...state,
        loggedInUser: undefined,
      };
    }
    case actions.EDIT_USER: {
      return {
        ...state,
        loggedInUser: action.payload?.user,
      };
    }
    case actions.LIKE: {
      const id = state.posts.findIndex((el: IPost) => el.slug === action.payload.slug);
      let oldPost: IPost = state.posts[id];
      let newPost = {
        ...oldPost,
        favorited: true,
        favoritesCount: oldPost.favoritesCount + 1,
      };
      let newPosts = [...state.posts.slice(0, id), newPost, ...state.posts.slice(id + 1)];
      return {
        ...state,
        posts: newPosts,
      };
    }
    case actions.UNLIKE: {
      const idx = state.posts.findIndex((el: IPost) => el.slug === action.payload.slug);
      let oldArticle: IPost = state.posts[idx];
      let newArticle = {
        ...oldArticle,
        favorited: false,
        favoritesCount: oldArticle.favoritesCount - 1,
      };
      let newArticles = [...state.posts.slice(0, idx), newArticle, ...state.posts.slice(idx + 1)];
      return {
        ...state,
        posts: newArticles,
      };
    }
    case actions.ERROR: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    default:
      return state;
  }
};
export default reducer;
