import db from "~database/connection";
import { deleteQuestion } from "~database/queries";
import withMiddleware from "~middlewares";
import { unableToRemoveQuestion } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Deletes a question.
 *
 * @function deleteUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const deleteUserQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw String(unableToRemoveQuestion);

    const { id: userid } = req.user;

    const question = await db.oneOrNone(deleteQuestion, [id, userid]);
    if (!question) throw String(unableToRemoveQuestion);

    res.status(201).send({
      question,
      message: "Successfully removed the question."
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(deleteUserQuestion));
