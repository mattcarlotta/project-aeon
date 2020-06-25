import get from "lodash.get";
import db from "~database/connection";
import { findQuestion, updateQuestionViewCount } from "~database/queries";
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
    if (!id || Number.isNaN(parseInt(id, 10)))
      throw String(unableToLocateQuestion);
    const userid = get(req.session, ["id"]);

    const { question } = await db.task("fetch user question", async t => {
      try {
        const question = await t.oneOrNone(findQuestion, [id, userid]);
        if (!question) throw String(unableToLocateQuestion);

        await t.none(updateQuestionViewCount, [id]);

        return { question };
      } catch (error) {
        return Promise.reject(new Error(error));
      }
    });

    // answers

    res.status(201).send({ question });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchUserQuestion);
