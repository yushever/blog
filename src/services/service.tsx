import axios from "axios";
import {
  IRegisterUser,
  ILoggedUser,
  IEditUser,
  INewPost,
  IEditPost,
} from "../models";
export default class GetPosts {
  async getAllPosts() {
    let res = await axios.get("https://blog.kata.academy/api/articles?limit=5");
    console.log(res);
    return res.data;
  }
  async getMorePosts(page: number) {
    let res = await axios.get(
      `https://blog.kata.academy/api/articles?limit=5&offset=${5 * (page - 1)}`
    );
    // console.log(res.data.articles)
    return res.data;
  }
  async getOnePost(slug: string) {
    let res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
    // console.log(res);
    return res.data.article;
  }
  async registerUser(obj: { user: IRegisterUser }) {
    let newUser = await axios.post("https://api.realworld.io/api/users", obj);
    console.log("Signup", newUser);
    return newUser;
  }
  async loginUser(obj: { user: { email: string; password: string } }) {
    let newUser = await axios.post(
      "https://api.realworld.io/api/users/login",
      obj
    );
    console.log("Login", newUser.data.user);
    return newUser.data.user;
  }
  async editUser(obj: { user: IEditUser }, token: string) {
    let edittedUser = await axios.put(
      "https://api.realworld.io/api/user",
      obj,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("Editted:", edittedUser);
    return edittedUser.data.user;
  }
  async createPost(obj: { article: INewPost }, token: string) {
    let newPost = await axios.post(
      "https://api.realworld.io/api/articles",
      obj,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("New Post", newPost);
    return newPost;
  }
  async editPost(obj: { article: IEditPost }, token: string, slug: string) {
    let edittedPost = await axios.put(
      `https://api.realworld.io/api/articles/${slug}`,
      obj,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    console.log("EdittedPost:", edittedPost);
    return edittedPost;
  }
}

// const object = {
//   user: {
//     bio: "Hello guys!",
//     email: "cat@cat.cat",
//     image:
//       "https://is1-ssl.mzstatic.com/image/thumb/Purple1/v4/91/fa/6e/91fa6ed3-2324-2385-75ec-928de68642e1/source/256x256bb.jpg",
//     password: "catcat",
//     username: "catcatcat",
//   },
// };
// const postsService = new GetPosts();
// postsService.editUser(object);
