import db from "~database/connection";
import {
  downvoteQuestion,
  findUpdatedQuestion,
  voteOnOwnQuestion,
  votedOnQuestion
} from "~database/queries";
import {
  alreadyVoted,
  cantVoteOnOwnQuestion,
  unableToLocateQuestion
} from "~messages/errors";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Updates a list of downvoters for a question.
 *
 * @function downvoteUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const downvoteUserQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id || Number.isNaN(parseInt(id, 10)))
      throw String(unableToLocateQuestion);

    const { id: userId } = req.session;

    const updatedQuestion = await db.task("down vote question", async task => {
      try {
        const questionBelongsToLoggedinUser = await task.oneOrNone(
          voteOnOwnQuestion,
          [id, userId]
        );
        if (questionBelongsToLoggedinUser) throw String(cantVoteOnOwnQuestion);

        const { downvoted } = await task.oneOrNone(votedOnQuestion, [
          id,
          userId
        ]);
        if (downvoted) throw String(alreadyVoted);

        const upvotedQuestion = await task.oneOrNone(downvoteQuestion, [
          id,
          userId
        ]);
        if (!upvotedQuestion) throw String(unableToLocateQuestion);

        const updatedQuestion = await task.oneOrNone(findUpdatedQuestion, [
          id,
          userId
        ]);

        return updatedQuestion;
      } catch (err) {
        return Promise.reject(new Error(err));
      }
    });

    res.status(201).send(updatedQuestion);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(downvoteUserQuestion));
