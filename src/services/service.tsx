import axios from "axios";
export default class GetPosts {
    async getAllPosts() {
        let res = await axios.get("https://blog.kata.academy/api/articles?limit=5");
        console.log(res)
        return res.data;
    }
    async getMorePosts(page: number) {
        let res = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${5 * (page - 1)}`);
        // console.log(res.data.articles)
        return res.data;
    }
    async getOnePost(slug: string) {
        let res = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
        console.log(res)
        return res.data.article;
    }
}
