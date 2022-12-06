import axios from "axios";
export default class GetPosts {
    async getAllPosts() {
        let res = await axios.get("https://blog.kata.academy/api/articles?limit=5");
        return res.data.articles;
    }
}
