export interface IState {
  posts: [];
  articlesCount: number;
  pageNumber: number;
  loggedInUser?: ILoggedUser;
  loading: boolean;
}

export interface ILoggedUser {
  email: string;
  username: string;
  bio?: string;
  image?: string;
  token?: string;
  password?: string;
}

export interface IEditUser {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface IPost {
  author: { username: string; image: string; following: false };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface INewPost {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface IEditPost {
  title: string;
  description: string;
  body: string;
}
