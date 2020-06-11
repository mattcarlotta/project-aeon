import withMiddleware from "~middlewares";
import { sendError } from "~utils/helpers";
// import db from "~database/connection";
// import { findUserByDisplayName, updateProfile } from "~database/queries";

/**
 * Fetches newest questions.
 *
 * @function fetchNewestQuestions
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const fetchNewestQuestions = async (req, res) => {
  try {
    throw String("Not yet.");
    // res.status(201).json({ message: "Successfully update your profile!" });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchNewestQuestions);
