import { combineReducers } from "redux";
import questionsReducer from "./Questions";
import serverReducer from "./Server";
import userReducer from "./Users";

const reducers = {
	questions: questionsReducer,
	server: serverReducer,
	users: userReducer,
};

export default combineReducers(reducers);
