import { put, call } from "redux-saga/effects";
import { setError } from "~actions/Messages";
import toast from "~components/Body/Toast";

/**
 * Helper function to redirect a user client-side or server-side.
 *
 * @generator
 * @function setError
 * @param {object} message - an API error response message.
 * @yields {action} - A redux action to set server messages to redux state.
 * @yields {function} - A function to trigger an error toast with the server message.
 */
function* setServerError(message) {
	yield put(setError(message.toString()));
	yield call(toast, { type: "error", message: message.toString() });
}

export default setServerError;
