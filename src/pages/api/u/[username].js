import isEmpty from "lodash.isempty";
import db from "~database/connection";
import { findUserByUsername } from "~database/queries";
import { unableToLocateUser } from "~messages/errors";
import withMiddleware from "~middlewares";
import { sendError } from "~utils/helpers";

/**
 * Fetches user details.
 *
 * @function fetchUserDetails
 * @param {object} req
 * @param {object} res
 * @returns {array} data
 * @throws {string} err
 */
const fetchUserDetails = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) throw String(unableToLocateUser);

    const existingUser = await db.oneOrNone(findUserByUsername, [username]);
    if (isEmpty(existingUser)) throw String(unableToLocateUser);

    res.status(200).send(existingUser);
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(fetchUserDetails);
