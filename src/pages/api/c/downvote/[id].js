import db from "~database/connection";
import {
  downvoteComment,
  findComment,
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
 * Updates a list of downvoters for a comment.
 *
 * @function downvoteUserComment
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const downvoteUserComment = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id || Number.isNaN(parseInt(id, 10)))
      throw String(unableToLocateComment);

    const { id: userId } = req.session;

    const updatedComment = await db.task("down vote comment", async task => {
      try {
        const commentBelongsToLoggedinUser = await task.oneOrNone(
          voteOnOwnComment,
          [id, userId]
        );
        if (commentBelongsToLoggedinUser) throw String(cantVoteOnOwnComment);

        const { downvoted } = await task.oneOrNone(votedOnComment, [
          id,
          userId
        ]);
        if (downvoted) throw String(alreadyVoted);

        const downvotedComment = await task.oneOrNone(downvoteComment, [
          id,
          userId
        ]);
        if (!downvotedComment) throw String(unableToLocateComment);

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

export default withMiddleware(requireAuth(downvoteUserComment));
