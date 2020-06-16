import isEmpty from "lodash.isempty";
import db from "~database/connection";
import { findAllQuestionsByTagLimitAndOffset } from "~database/queries";
import { unableToLocateQuestions, unableToLocateTag } from "~messages/errors";
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
const fetchNewestQuestionsByTag = async (req, res) => {
  try {
    const { tag } = req.query;
    if (!tag) throw String(unableToLocateTag);

    const data = await db.any(findAllQuestionsByTagLimitAndOffset, [
      [tag],
      10,
      0,
    ]);
    if (isEmpty(data)) throw String(unableToLocateQuestions);

    res.status(201).send(data);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchNewestQuestionsByTag);
