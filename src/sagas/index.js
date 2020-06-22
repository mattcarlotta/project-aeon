import { all } from "redux-saga/effects";
import authenticationSagas from "./Authentications";

export default function* rootSaga() {
  yield all([authenticationSagas()]);
}
