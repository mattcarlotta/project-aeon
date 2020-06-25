import db from "~database/connection";
import { createNewQuestion } from "~database/queries";
import withMiddleware from "~middlewares";
import { missingQuestionReqs, titleIsTooLong } from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { createDashedTitle, sendError } from "~utils/helpers";
import { parseMarkdown } from "~utils/parse";

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
    if (!body || !title) throw String(missingQuestionReqs);
    if (title.length > 250) throw String(titleIsTooLong);

    const { id: userid } = req.user;
    const dashedTitle = createDashedTitle(title);
    const description = await parseMarkdown(body);

    const { id } = await db.one(createNewQuestion, [
      userid,
      body,
      description,
      tags,
      title,
      dashedTitle
    ]);

    res.status(201).json({
      id,
      title: dashedTitle,
      message: "Successfully created a question!"
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(createQuestion));
