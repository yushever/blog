import GetPosts from "./services/service";
import { IEditUser, ILoggedUser } from "./models";

const postsService = new GetPosts();
export const SET = "SET";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const EDIT_USER = "EDIT_USER";
export const LIKE = "LIKE";
export const UNLIKE = "UNLIKE";

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
      postsService.getAllPosts(token).then((res) => {
        dispatch(setPosts(res));
        // console.log(res.articlesCount);
        // console.log(res);
      });
    }
  };
};

export const getPostsByPage = (page: number, token?: string) => {
  return (dispatch: any) => {
    {
      postsService.getMorePosts(page, token).then((res) => {
        dispatch(setPosts(res));
        // console.log(res);
        // showPosts(dispatch);
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
  cb: any
) => {
  return (dispatch: any) => {
    {
      postsService.loginUser(obj).then((res) => {
        console.log("loginUser", res);
        localStorage.setItem("user", JSON.stringify(res));
        dispatch(login(res));
        cb();
      });
    }
  };
};

export const logout = () => {
  localStorage.removeItem("user");
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
      postsService.editUser(obj, token).then((res) => {
        console.log("editUser", res);
        localStorage.setItem("user", JSON.stringify(res));
        dispatch(edit(res));
      });
    }
  };
};

export const like = (token: string, slug: string, like: boolean) => {
  return (dispatch: any) => {
    if (like) {
      postsService.likePost(token, slug).then((res) =>
        dispatch({
          type: LIKE,
          payload: {
            slug,
          },
        })
      );
    } else {
      postsService.dislikePost(token, slug).then((res) =>
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
