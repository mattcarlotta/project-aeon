import isEmpty from "lodash.isempty";
import * as constants from "~constants";

/**
 * @function createComment - creates a comment to a question.
 * @param props - include title, tags and question
 * @returns {object}
 */
export const createComment = props => ({
  type: constants.QUESTIONS_CREATE_COMMENT,
  props,
});

/**
 * @function createQuestion - creates a question.
 * @param props - include title, tags and body
 * @returns {object}
 */
export const createQuestion = props => ({
  type: constants.QUESTIONS_CREATE,
  props,
});

/**
 * @function fetchQuestions - fetches newest questions.
 * @returns {object}
 */
export const fetchQuestions = () => ({ type: constants.QUESTIONS_FETCH });

/**
 * @function fetchQuestions - fetches a question by id.
 * @param {string} - id
 * @returns {object}
 */
export const fetchOneQuestion = id => ({ type: constants.QUESTIONS_FETCH, id });

/**
 * @function setOneQuestion - sets currently selected question to redux.
 * @param {array} - data contains an object of {id, userid, date, answered, views, title, body, tags, comments }
 * @returns {object}
 */
export const setOneQuestion = data => ({
  type: constants.QUESTIONS_SET_ONE,
  payload: !isEmpty(data) ? data : {},
});

/**
 * @function setQuestions - sets currently select questions to redux.
 * @param {array} - data contains an array of [{id, userid, date, answered, views, title, body, tags, comments }]
 * @returns {object}
 */
export const setQuestions = data => ({
  type: constants.QUESTIONS_SET,
  payload: !isEmpty(data) ? data : [],
});
