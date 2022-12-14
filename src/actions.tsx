import { toast } from 'react-toastify';

import GetPosts from './services/service';
import { IEditUser, ILoggedUser } from './models';
import 'react-toastify/dist/ReactToastify.css';

const postsService = new GetPosts();
export const SET = 'SET';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const EDIT_USER = 'EDIT_USER';
export const LIKE = 'LIKE';
export const UNLIKE = 'UNLIKE';
export const ERROR = 'ERROR';

export const setPosts = (resObj: { articles: []; articlesCount: number }) => {
  return {
    type: SET,
    payload: {
      posts: resObj.articles,
      articlesCount: resObj.articlesCount,
    },
  };
};

export const getPosts = (token?: string) => {
  return (dispatch: any) => {
    {
      postsService
        .getAllPosts(token)
        .then((res) => {
          dispatch(setPosts(res));
        })
        .catch(() => {
          dispatch({ type: ERROR });
        });
    }
  };
};

export const getPostsByPage = (page: number, token?: string) => {
  return (dispatch: any) => {
    {
      postsService
        .getMorePosts(page, token)
        .then((res) => {
          dispatch(setPosts(res));
        })
        .catch(() => {
          dispatch({ type: ERROR });
        });
    }
  };
};

export const login = (user: ILoggedUser) => {
  return {
    type: LOGIN,
    payload: {
      user,
    },
  };
};

export const loginUser = (
  obj: {
    user: { email: string; password: string };
  },
  cb?: any
) => {
  return (dispatch: any) => {
    {
      postsService
        .loginUser(obj)
        .then((res) => {
          toast.success('Welcome to the awesome blog!');
          localStorage.setItem('user', JSON.stringify(res));
          dispatch(login(res));
          cb();
        })
        .catch(() => {
          toast.error('Something went wrong. Please try again.');
        });
    }
  };
};

export const logout = () => {
  localStorage.removeItem('user');
  return {
    type: LOGOUT,
  };
};

export const edit = (user: any) => {
  return {
    type: EDIT_USER,
    payload: {
      user,
    },
  };
};

export const editUser = (obj: { user: IEditUser }, token: string) => {
  return (dispatch: any) => {
    {
      postsService
        .editUser(obj, token)
        .then((res) => {
          toast.success('Your profile was successfully updated.');
          localStorage.setItem('user', JSON.stringify(res));
          dispatch(edit(res));
        })
        .catch(() => {
          toast.error('Something went wrong. Please try again.');
        });
    }
  };
};

export const like = (token: string, slug: string, likes: boolean) => {
  return (dispatch: any) => {
    if (likes) {
      postsService.likePost(token, slug).then(() =>
        dispatch({
          type: LIKE,
          payload: {
            slug,
          },
        })
      );
    } else {
      postsService.dislikePost(token, slug).then(() =>
        dispatch({
          type: UNLIKE,
          payload: {
            slug,
          },
        })
      );
    }
  };
};
