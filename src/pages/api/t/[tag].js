import get from "lodash.get";
import isEmpty from "lodash.isempty";
import db from "~database/connection";
import { findAllQuestionsByTagLimitAndOffset } from "~database/queries";
import {
  unableToLocateTaggedQuestions,
  unableToLocateTag,
} from "~messages/errors";
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
    const userid = get(req.session, ["id"]);

    const data = await db.any(findAllQuestionsByTagLimitAndOffset, [
      [tag],
      10,
      0,
      userid,
    ]);
    if (isEmpty(data)) throw String(unableToLocateTaggedQuestions);

    res.status(201).send(data);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchNewestQuestionsByTag);
