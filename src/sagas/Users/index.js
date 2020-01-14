import { all, put, call, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import app from "~utils/axiosConfig";
import { parseCookie, parseData, parseMessage } from "~utils/parseResponse";
import Redirect from "~utils/redirect";
import * as types from "~types";
import * as actions from "~actions/Users";
import { setError, setMessage, resetMessage } from "~actions/Server";
import toast from "~components/Body/Toast";

/**
 * Removes the current user from a express and redux session.
 *
 * @generator
 * @function signoutUserSession
 * @yields {object} - A redux action to remove the current user from state.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signoutUserSession() {
	try {
		yield call(app.get, "users/signout");

		yield put(actions.signout());

		yield call(Router.push, "/");
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to automatically sign user in via a session.
 *
 * @generator
 * @function authenticateUser
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* authenticateUser({ req }) {
	try {
		const headers = yield call(parseCookie, req);
		const res = yield call(app.get, "users/signedin", headers);
		const data = yield call(parseData, res);

		yield put(actions.signin(data));
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to automatically sign user in via a session.
 *
 * @generator
 * @function getProfile
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* getProfile({ req, res }) {
	try {
		const headers = yield call(parseCookie, req);
		const response = yield call(app.get, "users/profile", headers);
		const data = yield call(parseData, response);

		yield put(actions.setProfile(data));
	} catch (e) {
		yield call(Redirect, res);
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to sign user in to a new session.
 *
 * @generator
 * @function signinUser
 * @param {object} props - contains user credentials (email and password).
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} -  A redux action to set the current user to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signinUser({ props }) {
	try {
		yield call(resetMessage);

		const res = yield call(app.post, "users/signin", { ...props });
		const data = yield call(parseData, res);

		yield put(actions.signin(data));
		yield call(Router.push, "/");
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function signupUser
 * @param {object} props - props contain a token, an email, first/last name, and a password.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to push to a URL.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signupUser({ props }) {
	try {
		yield call(resetMessage);

		const res = yield call(app.post, "users/signup", { ...props });
		const message = yield call(parseMessage, res);

		yield call(toast, { type: "success", message });
		yield put(setMessage(message));

		yield call(Router.push, "/signin");
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Creates watchers for all generators.
 *
 * @generator
 * @function authSagas
 * @yields {watchers}
 */
export default function* authSagas() {
	yield all([
		takeLatest(types.USER_SIGNIN_SESSION, authenticateUser),
		takeLatest(types.USER_FETCH_PROFILE, getProfile),
		takeLatest(types.USER_SIGNIN_ATTEMPT, signinUser),
		takeLatest(types.USER_SIGNOUT_SESSION, signoutUserSession),
		takeLatest(types.USER_SIGNUP, signupUser),
	]);
}
