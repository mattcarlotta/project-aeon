import db from "~database/connection";
import { findUpdatedQuestion, upvoteQuestion } from "~database/queries";
import { unableToLocateQuestion } from "~messages/errors";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Updates a list of upvoters for a question.
 *
 * @function upvoteUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const upvoteUserQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw String(unableToLocateQuestion);

    const { id: userId } = req.session;

    const { updatedQuestion, err } = await db.task(
      "up vote question",
      async task => {
        try {
          const upvotedQuestion = await task.oneOrNone(upvoteQuestion, [
            id,
            userId,
          ]);
          if (!upvotedQuestion) throw String(unableToLocateQuestion);

          const updatedQuestion = await task.oneOrNone(findUpdatedQuestion, [
            id,
            userId,
          ]);
          return { updatedQuestion };
        } catch (err) {
          return { err };
        }
      },
    );
    if (err) throw String(err);

    res.status(201).send(updatedQuestion);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(upvoteUserQuestion));
