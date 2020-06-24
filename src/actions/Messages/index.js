import * as constants from "~constants";

/**
 * @function resetMessages - resets all messages.
 * @returns {object}
 */
export const resetMessages = () => ({ type: constants.RESET_MESSAGES });

/**
 * @function setMessage - adds a new message.
 * @returns {object}
 */
export const setMessage = message => ({
  type: constants.SET_MESSAGE,
  payload: message
});

/**
 * @function setError - adds a new error message.
 * @returns {object}
 */
export const setError = err => ({
  type: constants.SET_ERROR,
  payload: err
});
