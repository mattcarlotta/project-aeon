import isEmpty from "lodash/isEmpty";
import * as types from "~types";

/**
 * Sign in user via a session.
 *
 * @function authenticateUser
 * @returns {object}
 */
export const authenticateUser = req => ({
	type: types.USER_SIGNIN_SESSION,
	req,
});

/**
 * Sign in user via a session.
 *
 * @function getProfile
 * @returns {object}
 */
export const getProfile = ({ req, res }) => ({
	type: types.USER_FETCH_PROFILE,
	req,
	res,
});

/**
 * Sets user profile to redux state
 *
 * @function setProfile
 * @param {object} data - contains user session data (id, email, first/last name, and role).
 * @returns {object}
 */
export const setProfile = data => ({
	type: types.USER_SET_PROFILE,
	payload: !isEmpty(data) ? data : {},
});

/**
 * Sets current signed in user (can be guest) to redux state
 *
 * @function signin
 * @param {object} data - contains user session data (id, email, first/last name, and role).
 * @returns {object}
 */
export const signin = data => ({
	type: types.USER_SIGNIN,
	payload: !isEmpty(data) ? data : { role: "guest" },
});

/**
 * Attempts to sign user into a new session via login form.
 *
 * @function signinUser
 * @param {object} props - contains user session data (email, password).
 * @returns {object}
 */
export const signinUser = props => ({
	type: types.USER_SIGNIN_ATTEMPT,
	props,
});

/**
 * Attempts to signs user out of current session.
 *
 * @function signoutUser
 * @returns {object}
 */
export const signoutUser = () => ({
	type: types.USER_SIGNOUT_SESSION,
});

/**
 * Signs user out of current session.
 *
 * @function signout
 * @returns {object}
 */
export const signout = () => ({
	type: types.USER_SIGNOUT,
});

/**
 * Sign up user via signup form.
 *
 * @function signupUser
 * @param {object} props - contains a token, an email, first/last name, and a password.
 * @returns {object}
 */
export const signupUser = props => ({
	type: types.USER_SIGNUP,
	props,
});
