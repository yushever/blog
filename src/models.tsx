export interface IState {
    posts: [];
    articlesCount: number,
    pageNumber: number,
}

export interface IPost {
    author: { username: string, image: string, following: false };
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
