import db from "~database/connection";
import { createNewQuestion } from "~database/queries";
import withMiddleware from "~middlewares";
import { missingQuestionReqs } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { createDashedTitle, sendError } from "~utils/helpers";

/**
 * Creates questions.
 *
 * @function createQuestion
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const createQuestion = async (req, res) => {
  try {
    const { body, title, tags } = req.body;
    const { id } = req.user;
    if (!body || !title) throw String(missingQuestionReqs);

    const dashedTitle = createDashedTitle(title);

    const { key } = await db.one(createNewQuestion, [
      id,
      body,
      tags,
      title,
      dashedTitle,
    ]);

    res.status(201).json({
      key,
      title: dashedTitle,
      message: "Successfully created a question!",
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(createQuestion));
