import isEmpty from "lodash.isempty";
import db from "~database/connection";
import { findAllQuestionsByLimitAndOffset } from "~database/queries";
import { unableToLocateQuestions } from "~messages/errors";
import withMiddleware from "~middlewares";
import { sendError } from "~utils/helpers";

/**
 * Fetches newest questions.
 *
 * @function fetchNewestQuestions
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const fetchNewestQuestions = async (_, res) => {
  try {
    const data = await db.any(findAllQuestionsByLimitAndOffset, [10, 0]);
    if (isEmpty(data)) throw String(unableToLocateQuestions);

    res.status(201).send(data);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchNewestQuestions);
