import { missingNames, usernameAlreadyTaken } from "~messages/errors";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";
import db from "~database/connection";
import { findUserByUsername, updateProfile } from "~database/queries";

/**
 * Attempts to update a user's profile.
 *
 * @function updateUserProfile
 * @returns {string} message
 * @throws {string} err
 */
const updateUserProfile = async (req, res) => {
  try {
    const { id, email } = req.session;
    const { firstname, lastname, website, username, description } = req.body;
    if (!firstname || !lastname || !username) throw String(missingNames);

    if (username) {
      const existingUser = await db.oneOrNone(findUserByUsername, [username]);

      if (existingUser && existingUser.email !== email)
        throw String(usernameAlreadyTaken);
    }

    await db.none(updateProfile, [
      id,
      username,
      firstname,
      lastname,
      website,
      description,
    ]);

    res.status(201).json({ message: "Successfully update your profile!" });
  } catch (err) {
    return sendError(err, res);
  }
};

export default withMiddleware(requireAuth(updateUserProfile));
