import GetPosts from "./services/service";

const postsService = new GetPosts();
export const SET = 'SET';

export const setPosts = (resObj: { articles: [], articlesCount: number }) => {
    return {
        type: SET,
        payload: {
            posts: resObj.articles,
            articlesCount: resObj.articlesCount
        },
    };
};

export const getPosts = () => {
    return (dispatch: any) => {
        {
            postsService.getAllPosts().then((res) => {
                dispatch(setPosts(res));
                console.log(res.articlesCount);
                console.log(res);
                // showPosts(dispatch);
            });
        }
    };
};
export const getPostsByPage = (page: number) => {
    return (dispatch: any) => {
        {
            postsService.getMorePosts(page).then((res) => {
                dispatch(setPosts(res));
                // console.log(res);
                // showPosts(dispatch);
            });
        }
    };
};
// export const getPostBySlug = (slug: string) => {
//     return (dispatch: any) => {
//         {
//             postsService.getOnePost(slug).then((res) => {
//                 dispatch(setPosts(res));
//                 // console.log(res);
//                 // showPosts(dispatch);
//             });
//         }
//     };
// };
