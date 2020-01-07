import * as types from "~types";

export const initialState = {
	id: "",
	email: "",
	firstName: "",
	lastName: "",
	role: "",
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
			return { ...state, ...payload };
		}
		case types.USER_SIGNOUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default userReducer;
