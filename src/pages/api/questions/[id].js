import db from "~database/connection";
import { findQuestion } from "~database/queries";
import { unableToLocateQuestion } from "~messages/errors";
import withMiddleware from "~middlewares";
import { sendError } from "~utils/helpers";

/**
 * Fetches newest questions.
 *
 * @function fetchUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const fetchUserQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw String(unableToLocateQuestion);

    const existingQuestion = await db.oneOrNone(findQuestion, [id]);
    if (!existingQuestion) throw String(unableToLocateQuestion);

    res.status(201).send(existingQuestion);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchUserQuestion);
