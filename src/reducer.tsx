import { Reducer } from 'redux';
import * as actions from './actions';
import { IState } from './models';

const reducer: Reducer = (
    state: IState = {
        posts: [],
    },
    action: { type?: string; payload?: any } = {}
) => {
    switch (action.type) {
        case actions.SET:
            return {
                ...state, posts: [...state.posts, ...action.payload]
            };
        default:
            return state;
    }
}
export default reducer;


