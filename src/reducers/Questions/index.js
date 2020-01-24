import * as types from "~types";

export const initialState = {
	data: [],
	question: {},
	isLoading: true,
};

/**
 * @function questionsReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - questions state.
 */
const questionsReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case types.QUESTIONS_FETCH:
		case types.QUESTIONS_FETCH_ONE: {
			return initialState;
		}
		case types.QUESTIONS_SET: {
			return { ...state, data: payload, isLoading: false };
		}
		case types.QUESTIONS_SET_ONE: {
			return { ...state, question: payload, isLoading: false };
		}
		default: {
			return state;
		}
	}
};

export default questionsReducer;
