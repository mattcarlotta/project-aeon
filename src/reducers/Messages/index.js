import { HYDRATE } from "next-redux-wrapper";
import * as constants from "~constants";

export const initialState = {
  error: "",
  message: ""
};

/**
 * @function messageReducer
 * @param {object} state - an object containing error or server messages.
 * @param {object} action - type and payload to be reduced.
 * @returns {object} - server state.
 */
const messageReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case HYDRATE:
      return { ...state, ...payload.messages };
    case constants.RESET_MESSAGES: {
      return initialState;
    }
    case constants.SET_ERROR: {
      return { ...state, error: payload };
    }
    case constants.SET_MESSAGE: {
      return { ...state, message: payload };
    }
    default:
      return state;
  }
};

export default messageReducer;
