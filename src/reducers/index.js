import { combineReducers } from "redux";
import authenticationReducer from "./Authentication";
import questionsReducer from "./Questions";
import serverReducer from "./Server";

const reducers = {
	authentication: authenticationReducer,
	questions: questionsReducer,
	server: serverReducer
};

export default combineReducers(reducers);
