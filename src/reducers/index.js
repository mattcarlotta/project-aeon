import { combineReducers } from "redux";
import authenticationReducer from "./Authentication";
import messagesReducer from "./Messages";

const reducers = {
  authentication: authenticationReducer,
  messages: messagesReducer,
};

export default combineReducers(reducers);
