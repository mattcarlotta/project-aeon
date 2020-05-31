import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";

export const initialState = {
	data: [],
	question: {},
	isLoading: true
};

/**
 * @function questionsReducer
 * @param {object} state - an object containing data and isLoading state.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - questions state.
 */
const questionsReducer = (state = initialState, { payload, type }) => {
	switch (type) {
		case HYDRATE:
			return { ...state, ...payload.questions };
		case constants.QUESTIONS_FETCH:
		case constants.QUESTIONS_FETCH_ONE: {
			return initialState;
		}
		case constants.QUESTIONS_SET: {
			return { ...state, data: payload, isLoading: false };
		}
		case constants.QUESTIONS_SET_ONE: {
			return { ...state, question: payload, isLoading: false };
		}
		default: {
			return state;
		}
	}
};

export default questionsReducer;
