import { Reducer } from "redux";
import * as actions from "./actions";
import { IState } from "./models";

const reducer: Reducer = (
  state: IState = {
    posts: [],
    loggedInUser: undefined,
    articlesCount: 0,
    pageNumber: 1,
  },
  action: { type?: string; payload?: any } = {}
) => {
  switch (action.type) {
    case actions.SET:
      // console.log(action.payload);
      return {
        ...state,
        posts: action.payload.posts,
        articlesCount: action.payload.articlesCount,
      };
    case actions.LOGIN:
      // console.log(action.payload.user);
      return {
        ...state,
        loggedInUser: action.payload.user,
      };
    case actions.LOGOUT:
      console.log("Logout completed");
      return {
        ...state,
        loggedInUser: undefined,
      };
    default:
      return state;
  }
};
export default reducer;
