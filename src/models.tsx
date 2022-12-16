export interface IState {
  posts: [];
  articlesCount: number;
  pageNumber: number;
  loggedInUser?: ILoggedUser;
}

export interface ILoggedUser {
  email: string;
  username: string;
  bio: string;
  image: string;
  token: string;
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
