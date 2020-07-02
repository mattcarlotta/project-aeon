import db from "~database/connection";
import { updateQuestion } from "~database/queries";
import withMiddleware from "~middlewares";
import {
  missingQuestionUpdateReqs,
  titleIsTooLong,
  unableToLocateQuestion
} from "~messages/errors";
import requireAuth from "~strategies/requireAuth";
import { createDashedTitle, sendError } from "~utils/helpers";
import { parseMarkdown } from "~utils/parse";

/**
 * Updates questions.
 *
 * @function updateUserQuestion
 * @param {object} req
 * @param {object} res
 * @returns {string} message
 * @throws {string} err
 */
const updateUserQuestion = async (req, res) => {
  try {
    const { id, body, title, tags } = req.body;
    if (!body || !title) throw String(missingQuestionUpdateReqs);
    if (!id) throw String(unableToLocateQuestion);
    if (title.length > 250) throw String(titleIsTooLong);

    const { id: userid } = req.user;
    const dashedTitle = createDashedTitle(title);
    const description = await parseMarkdown(body);
    const updated = new Date();

    const question = await db.one(updateQuestion, [
      id,
      userid,
      body,
      description,
      tags,
      title,
      dashedTitle,
      updated
    ]);

    res.status(201).json({
      question,
      message: "Successfully updated the question!"
    });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(updateUserQuestion));
