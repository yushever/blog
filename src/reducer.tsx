import { Reducer } from 'redux';
import * as actions from './actions';
import { IState } from './models';

const reducer: Reducer = (
    state: IState = {
        posts: [],
        articlesCount: 0,
        pageNumber: 1,
    },
    action: { type?: string; payload?: any } = {}
) => {
    switch (action.type) {
        case actions.SET:
            console.log(action.payload);
            return {
                ...state, posts: action.payload.posts, articlesCount: action.payload.articlesCount
            };

        default:
            return state;
    }
}
export default reducer;


