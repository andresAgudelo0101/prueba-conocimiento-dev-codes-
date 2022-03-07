import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import UserReducer from "./modules/user.actions";

export const rootEpic = combineEpics();
export const rootReducer = combineReducers({
  user: UserReducer,
});