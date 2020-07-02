import db from "~database/connection";
import { updateComment, findComment } from "~database/queries";
import withMiddleware from "~middlewares";
import { invalidCommentLength, missingCommentId } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Updates a comment body.
 *
 * @function updateUserComment
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const updateUserComment = async (req, res) => {
  try {
    const { id, body } = req.body;
    if (!body || !(body.length >= 5 && body.length <= 1000))
      throw String(invalidCommentLength);

    const { id: userid } = req.user;
    if (!id) throw String(missingCommentId);

    const updatedComment = await db.task("update comment", async t => {
      try {
        const updated = new Date();
        const comment = await t.oneOrNone(updateComment, [
          id,
          userid,
          body,
          updated
        ]);
        if (!comment) throw String(missingCommentId);

        return t.one(findComment, [comment.id, userid]);
      } catch (err) {
        return Promise.reject(new Error(err));
      }
    });

    res.status(201).send({
      comment: updatedComment,
      message: "Successfully updated the comment."
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(updateUserComment));
