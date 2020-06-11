import { combineReducers } from "redux";
import authenticationReducer from "./Authentication";
import messagesReducer from "./Messages";
import questionsReducer from "./Questions";

const reducers = {
  authentication: authenticationReducer,
  messages: messagesReducer,
  questions: questionsReducer,
};

export default combineReducers(reducers);
