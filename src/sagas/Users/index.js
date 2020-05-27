import { all, put, call, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import app from "~utils/axiosConfig";
import imageAPI from "~utils/imageAPIConfig";
import { parseCookie, parseData, parseMessage } from "~utils/parseResponse";
import Redirect from "~utils/redirect";
import * as constants from "~constants";
import * as actions from "~actions/Users";
import { setError, setMessage, resetMessage } from "~actions/Server";
import toast from "~components/Body/Toast";

/**
 * Attempts to create a new user avatar.
 *
 * @generator
 * @function createUserAvatar
 * @param {object} props - props contains firstname, lastname, displayname, website, description.
 * @yields {object} - A response from a call to the Image API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* createUserAvatar({ props }) {
	try {
		yield put(resetMessage());

		let res = yield call(imageAPI.post, "avatar/create", props);
		const message = yield call(parseMessage, res);

		yield call(toast, { type: "success", message });
		yield put(setMessage(message));

		res = yield call(app.get, "users/signedin");
		const updatedUserData = yield call(parseData, res);

		yield put(actions.signin(updatedUserData));
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to delete a user avatar.
 *
 * @generator
 * @function createUserAvatar
 * @param {object} props - props contains firstname, lastname, displayname, website, description.
 * @yields {object} - A response from a call to the Image API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* deleteUserAvatar() {
	try {
		yield put(resetMessage());

		let res = yield call(imageAPI.delete, "avatar/delete");
		const message = yield call(parseMessage, res);

		yield call(toast, { type: "success", message });
		yield put(setMessage(message));

		res = yield call(app.get, "users/signedin");
		const updatedUserData = yield call(parseData, res);

		yield put(actions.signin(updatedUserData));
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

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
 * Redirects user if not signed in.
 *
 * @generator
 * @function checkAuth
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to set the current user.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* checkAuth({ req, res }) {
	try {
		const headers = yield call(parseCookie, req);
		yield call(app.get, "users/auth", headers);
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
		yield put(resetMessage());

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
		yield put(resetMessage());

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
 * Attempts to sign up a new user.
 *
 * @generator
 * @function updateUserAvatar
 * @param {object} props - props contains firstname, lastname, displayname, website, description.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserAvatar({ props }) {
	try {
		yield put(resetMessage());

		let res = yield call(imageAPI.put, "avatar/update", props);
		const message = yield call(parseMessage, res);

		yield call(toast, { type: "success", message });
		yield put(setMessage(message));

		res = yield call(app.get, "users/signedin");
		const updatedUserData = yield call(parseData, res);

		yield put(actions.signin(updatedUserData));
	} catch (e) {
		yield put(setError(e.toString()));
		yield call(toast, { type: "error", message: e.toString() });
	}
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function updateUserProfile
 * @param {object} props - props contains firstname, lastname, displayname, website, description.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserProfile({ props }) {
	try {
		yield put(resetMessage());

		let res = yield call(app.put, "users/profile/update", { ...props });
		const message = yield call(parseMessage, res);

		yield call(toast, { type: "success", message });
		yield put(setMessage(message));

		res = yield call(app.get, "users/signedin");
		const updatedUserData = yield call(parseData, res);

		yield put(actions.signin(updatedUserData));
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
		takeLatest(constants.USER_SIGNIN_SESSION, authenticateUser),
		takeLatest(constants.USER_CREATE_AVATAR, createUserAvatar),
		takeLatest(constants.USER_DELETE_AVATAR, deleteUserAvatar),
		takeLatest(constants.USER_CHECK_AUTH, checkAuth),
		takeLatest(constants.USER_SIGNIN_ATTEMPT, signinUser),
		takeLatest(constants.USER_SIGNOUT_SESSION, signoutUserSession),
		takeLatest(constants.USER_SIGNUP, signupUser),
		takeLatest(constants.USER_UPDATE_AVATAR, updateUserAvatar),
		takeLatest(constants.USER_UPDATE_PROFILE, updateUserProfile),
	]);
}
