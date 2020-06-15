import bcrypt from "bcryptjs";
import { findUserByUsername } from "~database/queries";
import { sendError } from "~utils/helpers";
import db from "~database/connection";
import { badCredentials, missingSigninCredentials } from "~messages/errors";

/**
 * Middleware function to login in a user (applies user to req.session).
 *
 * @function localLogin
 * @returns {function}
 * @throws {string}
 */
export const localLogin = next => async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw String(missingSigninCredentials);

    const existingUser = await db.oneOrNone(findUserByUsername, [username]);
    if (!existingUser) throw String(badCredentials);
    // if (!existingUser.verified) throw String(emailConfirmationReq);

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) throw String(badCredentials);

    req.session = {
      id: existingUser.id,
      avatar: existingUser.avatar,
      email: existingUser.email,
      firstname: existingUser.firstname,
      description: existingUser.description,
      lastname: existingUser.lastname,
      role: existingUser.role,
      registered: existingUser.registered,
      reputation: existingUser.reputation,
      username: existingUser.username,
      website: existingUser.website,
    };

    return next(req, res);
  } catch (err) {
    return sendError(err, res);
  }
};

export default localLogin;
