import axios from "axios";
import { IRegisterUser, IEditUser, INewPost, IEditPost } from "../models";
export default class GetPosts {
  async getAllPosts(token?: string) {
    let header = token ? { headers: { Authorization: `Token ${token}` } } : {};
    let res = await axios.get(
      "https://blog.kata.academy/api/articles?limit=5",
      header
    );
    return res.data;
  }
  async getMorePosts(page: number, token?: string) {
    let header = token ? { headers: { Authorization: `Token ${token}` } } : {};
    let res = await axios.get(
      `https://blog.kata.academy/api/articles?limit=5&offset=${5 * (page - 1)}`,
      header
    );
    return res.data;
  }
  async getOnePost(slug: string, token?: string) {
    let header = token ? { headers: { Authorization: `Token ${token}` } } : {};
    let res = await axios.get(
      `https://blog.kata.academy/api/articles/${slug}`,
      header
    );
    return res.data.article;
  }
  async registerUser(obj: { user: IRegisterUser }) {
    let newUser = await axios.post("https://blog.kata.academy/api/users", obj);
    return newUser;
  }
  async loginUser(obj: { user: { email: string; password: string } }) {
    let newUser = await axios.post(
      "https://blog.kata.academy/api/users/login",
      obj
    );
    return newUser.data.user;
  }
  async editUser(obj: { user: IEditUser }, token: string) {
    let edittedUser = await axios.put(
      "https://blog.kata.academy/api/user",
      obj,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return edittedUser.data.user;
  }
  async createPost(obj: { article: INewPost }, token: string) {
    let newPost = await axios.post(
      "https://blog.kata.academy/api/articles",
      obj,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return newPost;
  }
  async editPost(obj: { article: IEditPost }, token: string, slug: string) {
    let editedPost = await axios.put(
      `https://blog.kata.academy/api/articles/${slug}`,
      obj,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return editedPost;
  }
  async deletePost(token: string, slug: string) {
    let deletedPost = await axios.delete(
      `https://blog.kata.academy/api/articles/${slug}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return deletedPost;
  }
  async likePost(token: string, slug: string) {
    let likedPost = await axios.post(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return likedPost;
  }
  async dislikePost(token: string, slug: string) {
    let dislikedPost = await axios.delete(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return dislikedPost;
  }
}
