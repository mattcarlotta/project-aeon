import db from "~database/connection";
import { restoreQuestion } from "~database/queries";
import withMiddleware from "~middlewares";
import { unableToRestoreQuestion } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Restores a question.
 *
 * @function restoreUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const restoreUserQuestion = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) throw String(unableToRestoreQuestion);

    const { id: userid } = req.user;

    const question = await db.oneOrNone(restoreQuestion, [id, userid]);
    if (!question) throw String(unableToRestoreQuestion);

    res.status(201).send({
      question,
      message: "Successfully restored the question."
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(restoreUserQuestion));
