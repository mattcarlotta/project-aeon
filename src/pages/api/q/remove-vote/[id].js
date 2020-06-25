import db from "~database/connection";
import {
  findUpdatedQuestion,
  removeVoteFromQuestion,
  votedOnQuestion
} from "~database/queries";
import { unableToRemoveVote, unableToLocateQuestion } from "~messages/errors";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Updates a list of downvoters/upvoters for a question.
 *
 * @function removevoteUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const removeVoteUserQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id || Number.isNaN(parseInt(id, 10)))
      throw String(unableToLocateQuestion);

    const { id: userId } = req.session;

    const updatedQuestion = await db.task(
      "remove vote question",
      async task => {
        try {
          const { upvoted, downvoted } = await task.oneOrNone(votedOnQuestion, [
            id,
            userId
          ]);
          if (!upvoted && !downvoted) throw String(unableToRemoveVote);

          const upvotedQuestion = await task.oneOrNone(removeVoteFromQuestion, [
            id,
            userId
          ]);
          if (!upvotedQuestion) throw String(unableToLocateQuestion);

          return task.one(findUpdatedQuestion, [id, userId]);
        } catch (err) {
          return Promise.reject(new Error(err));
        }
      }
    );

    res.status(201).send(updatedQuestion);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(removeVoteUserQuestion));
