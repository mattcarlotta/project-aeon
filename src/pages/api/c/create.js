import db from "~database/connection";
import { createNewComment } from "~database/queries";
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
    console.log("body", req.body);
    const { id: userid } = req.user;
    if (!body || body.length < 2) throw String(invalidCommentLength);
    if (!qid || !rid) throw String(missingCommentReqs);

    const createdComment = await db.one(createNewComment, [
      userid,
      body,
      qid,
      rid
    ]);

    res.status(201).send(createdComment);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(createComments));
