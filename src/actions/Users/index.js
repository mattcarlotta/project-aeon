import isEmpty from "lodash.isempty";
import * as constants from "~constants";

/**
 * Sign in user via a session.
 *
 * @function authenticateUser
 * @returns {object}
 */
export const authenticateUser = req => ({
	type: constants.USER_SIGNIN_SESSION,
	req,
});

/**
 * Creates a user avatar.
 *
 * @function createUserAvatar
 * @param {object} props - contains file formdata.
 * @returns {object}
 */
export const createUserAvatar = props => ({
	type: constants.USER_CREATE_AVATAR,
	props,
});

/**
 * Creates a user avatar.
 *
 * @function deleteUserAvatar
 * @returns {object}
 */
export const deleteUserAvatar = () => ({
	type: constants.USER_DELETE_AVATAR,
});

/**
 * Sign in user via a session.
 *
 * @function checkAuth
 * @returns {object}
 */
export const checkAuth = ({ req, res }) => ({
	type: constants.USER_CHECK_AUTH,
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
	type: constants.USER_SET_PROFILE,
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
	type: constants.USER_SIGNIN,
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
	type: constants.USER_SIGNIN_ATTEMPT,
	props,
});

/**
 * Attempts to signs user out of current session.
 *
 * @function signoutUser
 * @returns {object}
 */
export const signoutUser = () => ({
	type: constants.USER_SIGNOUT_SESSION,
});

/**
 * Signs user out of current session.
 *
 * @function signout
 * @returns {object}
 */
export const signout = () => ({
	type: constants.USER_SIGNOUT,
});

/**
 * Sign up user via signup form.
 *
 * @function signupUser
 * @param {object} props - contains an email, first/last name, and a password.
 * @returns {object}
 */
export const signupUser = props => ({
	type: constants.USER_SIGNUP,
	props,
});

/**
 * Updates a user avatar.
 *
 * @function updateUserAvatar
 * @param {object} props - contains file formdata.
 * @returns {object}
 */
export const updateUserAvatar = props => ({
	type: constants.USER_UPDATE_AVATAR,
	props,
});

/**
 * Updates user profile.
 *
 * @function updateUserProfile
 * @param {object} props - contains firstname, lastname, displayname, website, description.
 * @returns {object}
 */
export const updateUserProfile = props => ({
	type: constants.USER_UPDATE_PROFILE,
	props,
});
