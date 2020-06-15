import bcrypt from "bcryptjs";
import db from "~database/connection";
import {
  createNewUser,
  findUserByEmail,
  findUserByUsername,
} from "~database/queries";
import {
  emailAlreadyTaken,
  missingSignupCreds,
  usernameAlreadyTaken,
} from "~messages/errors";
import { createRandomToken, sendError } from "~utils/helpers";

/**
 * Middleware function to register a user.
 *
 * @function localSignup
 * @returns {function}
 * @throws {string}
 */
export const localSignup = next => async (req, res) => {
  try {
    const { email, firstname, lastname, password, username } = req.body;

    if (!email || !username || !firstname || !lastname || !password)
      throw String(missingSignupCreds);

    const existingEmail = await db.oneOrNone(findUserByEmail, [email]);
    if (existingEmail) throw String(emailAlreadyTaken);
    const existingName = await db.oneOrNone(findUserByUsername, [username]);
    if (existingName) throw String(usernameAlreadyTaken);

    const newpassword = await bcrypt.hash(password, 12);
    const token = createRandomToken();

    await db.one(createNewUser, [
      email,
      newpassword,
      username,
      firstname,
      lastname,
      token,
    ]);

    req.user.firstname = firstname;

    return next(req, res);
  } catch (err) {
    return sendError(err, res);
  }
};

export default localSignup;
