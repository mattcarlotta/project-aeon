import get from "lodash.get";
import db from "~database/connection";
import {
  findComments,
  findQuestion,
  updateQuestionViewCount
} from "~database/queries";
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
    const userid = get(req.session, ["id"]);

    const invalidId = id.match("^[A-Za-z]+$");
    const santizedId = id.replace(/\D+/g, "");
    if (invalidId || !santizedId) throw String(unableToLocateQuestion);

    const { question, comments } = await db.task(
      "fetch user question",
      async t => {
        const question = await t.oneOrNone(findQuestion, [santizedId, userid]);
        if (!question) throw String(unableToLocateQuestion);

        await t.none(updateQuestionViewCount, [santizedId]);

        const existingComments = await t.oneOrNone(findComments, [
          santizedId,
          userid
        ]);
        const comments = get(existingComments, ["comments"]);

        return { question, comments };
      }
    );

    // answers

    res.status(201).send({ question, comments });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchUserQuestion);
