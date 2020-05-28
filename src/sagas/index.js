import { all } from "redux-saga/effects";
import authenticationSagas from "./Authentications";
import questionSagas from "./Questions";

export default function* rootSaga() {
	yield all([authenticationSagas(), questionSagas()]);
}
