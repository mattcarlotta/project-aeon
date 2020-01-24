import { all } from "redux-saga/effects";
import questionSagas from "./Questions";
import userSagas from "./Users";

export default function* rootSaga() {
	yield all([questionSagas(), userSagas()]);
}
