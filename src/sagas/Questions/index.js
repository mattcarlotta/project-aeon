import { all, put, call, takeLatest } from "redux-saga/effects";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse"; // parseMessage
import * as actions from "~actions/Questions";
import * as constants from "~constants";
import setServerError from "~utils/setServerError";

/**
 * Attempts to fetch newest questions.
 *
 * @generator
 * @function fetchQuestions
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @throws {action} - A redux action to set isLoading to false and display a server message by type.
 * @yields {action} - A redux action to set questions to state.
 */
export function* fetchQuestions() {
  try {
    const res = yield call(app.get, "questions");
    const data = yield call(parseData, res);

    yield put(actions.setQuestions(data));
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function questionSagas
 * @yields {watchers}
 */
export default function* questionSagas() {
  yield all([takeLatest(constants.QUESTIONS_FETCH, fetchQuestions)]);
}
