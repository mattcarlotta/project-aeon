import db from "~database/connection";
import { createNewComment, findComment } from "~database/queries";
import withMiddleware from "~middlewares";
import { invalidCommentLength, missingCommentReqs } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Creates comments to questions and answers.
 *
 * @function createComments
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const createComments = async (req, res) => {
  try {
    const { body, qid, rid } = req.body;
    const { id: userid } = req.user;
    if (!body || !(body.length >= 5 && body.length <= 500))
      throw String(invalidCommentLength);
    if (!qid || !rid) throw String(missingCommentReqs);

    const createdComment = await db.task("create comment", async t => {
      try {
        const { id: commentId } = await t.one(createNewComment, [
          userid,
          body,
          qid,
          rid
        ]);

        return t.one(findComment, [commentId, userid]);
      } catch (err) {
        return Promise.reject(new Error(err));
      }
    });

    res.status(201).send({
      comment: createdComment,
      message: "Successfully left a new comment."
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(createComments));
