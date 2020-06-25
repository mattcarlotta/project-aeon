import db from "~database/connection";
import {
  findComment,
  removeVoteFromComment,
  votedOnComment
} from "~database/queries";
import { unableToRemoveVote, unableToLocateComment } from "~messages/errors";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Updates a list of downvoters/upvoters for a comment.
 *
 * @function removeVoteUserComment
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const removeVoteUserComment = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id || Number.isNaN(parseInt(id, 10)))
      throw String(unableToLocateComment);

    const { id: userId } = req.session;

    const updatedComment = await db.task("remove vote comment", async task => {
      try {
        const comment = await task.oneOrNone(votedOnComment, [id, userId]);
        if (!comment || !comment.upvoted || !comment.downvoted)
          throw String(unableToRemoveVote);

        const upvotedComment = await task.oneOrNone(removeVoteFromComment, [
          id,
          userId
        ]);
        if (!upvotedComment) throw String(unableToLocateComment);

        return task.one(findComment, [id, userId]);
      } catch (err) {
        return Promise.reject(new Error(err));
      }
    });

    res.status(201).send(updatedComment);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(removeVoteUserComment));
