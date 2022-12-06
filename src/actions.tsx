import GetPosts from "./services/service";

const postsService = new GetPosts();

export const SET = 'SET';
export const setPosts = (posts: []) => {
    return {
        type: SET,
        payload: posts,
    };
};

async function showPosts(dispatch: any) {
    let posts = await postsService.getAllPosts();
    dispatch(setPosts(posts));
    console.log(posts);
}
export const getPosts = () => {
    return (dispatch: any) => { 
        {
            postsService.getAllPosts().then(() => {
                showPosts(dispatch);
            });
        }
    };
};

// const newPosts = postsService.getAllPosts().then((res) => {
//     console.log(res);
// });