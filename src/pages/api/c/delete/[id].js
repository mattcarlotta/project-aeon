import db from "~database/connection";
import { deleteComment } from "~database/queries";
import withMiddleware from "~middlewares";
import { unableToRemoveComment } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Deletes a comment.
 *
 * @function deleteUserComment
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const deleteUserComment = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw String(unableToRemoveComment);

    const { id: userid } = req.user;

    const comment = await db.oneOrNone(deleteComment, [id, userid]);
    if (!comment) throw String(unableToRemoveComment);

    res.status(201).send({
      comment,
      message: "Successfully removed the comment."
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(deleteUserComment));
