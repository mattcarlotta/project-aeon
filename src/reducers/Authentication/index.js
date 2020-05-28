import * as constants from "~constants";

export const initialState = {
	id: "",
	avatar: "",
	email: "",
	firstname: "",
	description: "",
	displayname: "",
	lastname: "",
	role: "",
	registered: "",
	reputation: 0,
	website: "",
	isLoading: true,
	settings: {}
};

/**
 * @function authenticationReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - users state.
 */
const authenticationReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case constants.AUTH_SIGNIN: {
			return { ...state, ...payload, isLoading: false };
		}
		case constants.AUTH_SET_PROFILE: {
			return { ...state, settings: payload.signedinUser };
		}
		case constants.AUTH_SIGNOUT: {
			return { ...initialState, role: "guest", isLoading: false };
		}
		default: {
			return state;
		}
	}
};

export default authenticationReducer;
