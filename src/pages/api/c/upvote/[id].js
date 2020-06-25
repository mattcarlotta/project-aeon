import db from "~database/connection";
import {
  findComment,
  upvoteComment,
  voteOnOwnComment,
  votedOnComment
} from "~database/queries";
import {
  alreadyVoted,
  cantVoteOnOwnComment,
  unableToLocateComment
} from "~messages/errors";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Updates a list of upvoters for a comment.
 *
 * @function upvoteUserComment
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const upvoteUserComment = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id || Number.isNaN(parseInt(id, 10)))
      throw String(unableToLocateComment);

    const { id: userId } = req.session;

    const updatedComment = await db.task("up vote comment", async task => {
      try {
        const commentBelongsToLoggedinUser = await task.oneOrNone(
          voteOnOwnComment,
          [id, userId]
        );
        if (commentBelongsToLoggedinUser) throw String(cantVoteOnOwnComment);

        const comment = await task.oneOrNone(votedOnComment, [id, userId]);
        if (comment && comment.upvoted) throw String(alreadyVoted);

        const upvotedComment = await task.oneOrNone(upvoteComment, [
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

export default withMiddleware(requireAuth(upvoteUserComment));
