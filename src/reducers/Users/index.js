import * as types from "~types";

export const initialState = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	role: "",
	isLoading: true,
	settings: {},
};

/**
 * @function userReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - USERS state.
 */
const userReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.USER_SIGNIN: {
			return { ...state, ...payload, isLoading: false };
		}
		case types.USER_SET_PROFILE: {
			return { ...state, settings: payload.signedinUser };
		}
		case types.USER_SIGNOUT: {
			return { ...initialState, role: "guest", isLoading: false };
		}
		default: {
			return state;
		}
	}
};

export default userReducer;
