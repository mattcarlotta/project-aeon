import { all, put, call, takeLatest } from "redux-saga/effects";
import Router from "next/router";
import app from "~utils/axiosConfig";
import imageAPI from "~utils/imageAPIConfig";
import { parseData, parseMessage } from "~utils/parse";
import * as constants from "~constants";
import * as actions from "~actions/Authentication";
import { setMessage, resetMessages } from "~actions/Messages";
import setServerError from "~utils/setServerError";
import toast from "~components/Body/Toast";

/**
 * Server/client-side sign in on initial load
 *
 * @generator
 * @function signinOnLoad
 * @yields {object} - A response from a call to API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to update redux authentication state.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
function* signinOnLoad({ config }) {
  let data = {};
  try {
    const res = yield call(app.get, "u/signedin", config);
    data = yield call(parseData, res);
  } catch (e) {
    yield call(setServerError, e.toString());
  } finally {
    yield put(actions.signin(data));
  }
}

/**
 * Updates the user's session.
 *
 * @generator
 * @function relogin
 * @yields {object} - A response from a call to API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} - A redux action to update redux authentication state.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
function* relogin() {
  try {
    const res = yield call(app.get, "u/signedin");
    const data = yield call(parseData, res);

    yield put(actions.signin(data));
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

/**
 * Attempts to create a new user avatar.
 *
 * @generator
 * @function createUserAvatar
 * @param {object} props - props contains firstname, lastname, username, website, description.
 * @yields {object} - A response from a call to the Image API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* createUserAvatar({ props }) {
  try {
    yield put(resetMessages());

    const res = yield call(imageAPI.post, "avatar/create", props);
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });
    yield put(setMessage(message));

    yield call(relogin);
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

/**
 * Attempts to delete a user avatar.
 *
 * @generator
 * @function createUserAvatar
 * @param {object} props - props contains firstname, lastname, username, website, description.
 * @yields {object} - A response from a call to the Image API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* deleteUserAvatar() {
  try {
    yield put(resetMessages());

    const res = yield call(imageAPI.delete, "avatar/delete");
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });
    yield put(setMessage(message));

    yield call(relogin);
  } catch (e) {
    yield call(setServerError, e.toString());
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
    yield call(app.get, "u/signout");

    yield call(Router.replace, "/");

    yield put(actions.signout());
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

/**
 * Attempts to sign user in to a new session.
 *
 * @generator
 * @function signinUser
 * @param {object} props - contains user credentials (username and password).
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {action} -  A redux action to set the current user to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* signinUser({ props }) {
  try {
    yield put(resetMessages());

    const res = yield call(app.post, "u/signin", { ...props });
    const data = yield call(parseData, res);

    yield put(actions.signin(data));
    yield call(Router.push, "/");
  } catch (e) {
    yield call(setServerError, e.toString());
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
    yield put(resetMessages());

    const res = yield call(app.post, "u/signup", { ...props });
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });
    yield put(setMessage(message));

    yield call(Router.push, "/u/signin");
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function updateUserAvatar
 * @param {object} props - props contains firstname, lastname, username, website, description.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserAvatar({ props }) {
  try {
    yield put(resetMessages());

    const res = yield call(imageAPI.put, "avatar/update", props);
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });
    yield put(setMessage(message));

    yield call(relogin);
  } catch (e) {
    yield call(setServerError, e.toString());
  }
}

/**
 * Attempts to sign up a new user.
 *
 * @generator
 * @function updateUserProfile
 * @param {object} props - props contains firstname, lastname, username, website, description.
 * @yields {object} - A response from a call to the API.
 * @function parseMessage - returns a parsed res.data.message.
 * @yields {action} - A redux action to display a server message by type.
 * @yields {action} - A redux action to get updated profile details.
 * @throws {action} - A redux action to display a server message by type.
 */
export function* updateUserProfile({ props }) {
  try {
    yield put(resetMessages());

    const res = yield call(app.put, "u/profile/update", { ...props });
    const message = yield call(parseMessage, res);

    yield call(toast, { type: "success", message });
    yield put(setMessage(message));

    yield call(relogin);
  } catch (e) {
    yield call(setServerError, e.toString());
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
    takeLatest(constants.AUTH_CREATE_AVATAR, createUserAvatar),
    takeLatest(constants.AUTH_DELETE_AVATAR, deleteUserAvatar),
    takeLatest(constants.AUTH_SIGNIN_ATTEMPT, signinUser),
    takeLatest(constants.AUTH_SIGNIN_ON_LOAD, signinOnLoad),
    takeLatest(constants.AUTH_SIGNOUT_SESSION, signoutUserSession),
    takeLatest(constants.AUTH_SIGNUP, signupUser),
    takeLatest(constants.AUTH_UPDATE_AVATAR, updateUserAvatar),
    takeLatest(constants.AUTH_UPDATE_PROFILE, updateUserProfile)
  ]);
}
