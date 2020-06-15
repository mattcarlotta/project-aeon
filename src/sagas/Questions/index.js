import { all, put, call, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import { setMessage } from "~actions/Messages";
import * as actions from "~actions/Questions";
import toast from "~components/Body/Toast";
import * as constants from "~constants";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse"; // parseMessage
import setServerError from "~utils/setServerError";

/**
 * Attempts to fetch newest questions.
 *
 * @generator
 * @function createQuestion
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @throws {action} - A redux action to set isLoading to false and display a server message by type.
 * @yields {action} - A redux action to set questions to state.
 */
export function* createQuestion({ props }) {
  try {
    const res = yield call(app.post, "q/create", props);
    const data = yield call(parseData, res);

    yield call(toast, { type: "success", message: data.message });
    yield put(setMessage(data.message));

    yield call(Router.push, `/q/${data.key}/${data.title}`);
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

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
    const res = yield call(app.get, "q");
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
  yield all([
    takeLatest(constants.QUESTIONS_CREATE, createQuestion),
    takeLatest(constants.QUESTIONS_FETCH, fetchQuestions),
  ]);
}
