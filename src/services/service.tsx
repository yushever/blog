import axios from "axios";
import { IRegisterUser } from "../models";
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
}

// const object = {
//     user: {
//         username: "stringTesr376s",
//         email: "strsswdwd4ing@mail.ru",
//         password: "string"
//     }
// }
// const object1 = {
//     user: {
//         email: "strsswdwd34ing@mail.ru",
//         password: "string"
//     }
// }
// const postsService = new GetPosts();
// postsService.registerUser(object);
// postsService.loginUser(object1);
