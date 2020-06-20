import db from "~database/connection";
import { findUserById } from "~database/queries";
import { invalidSession, notLoggedIn } from "~messages/errors";
import { parseSession, sendError } from "~utils/helpers";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
  try {
    const id = parseSession(req);
    if (!id) throw String(notLoggedIn);

    const existingUser = await db.oneOrNone(findUserById, [id]);
    if (!existingUser) throw String(invalidSession);

    req.user = existingUser;

    return next(req, res);
  } catch (err) {
    return sendError(err, res);
  }
};
