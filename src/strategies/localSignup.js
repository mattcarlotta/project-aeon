import bcrypt from "bcryptjs";
import db from "~database/connection";
import { createNewUser, findUserByEmail } from "~database/queries";
import { emailAlreadyTaken, missingSignupCreds } from "~messages/errors";
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
		const { email, firstname, lastname, password } = req.body;

		if (!email || !firstname || !lastname || !password)
			throw String(missingSignupCreds);

		const existingUser = await db.oneOrNone(findUserByEmail, [email]);
		if (existingUser) throw String(emailAlreadyTaken);

		const newPassword = await bcrypt.hash(password, 12);
		const token = createRandomToken();

		await db.one(createNewUser, [
			email,
			newPassword,
			firstname,
			lastname,
			token
		]);

		req.user.firstname = firstname;

		return next(req, res);
	} catch (err) {
		return sendError(err, res);
	}
};

export default localSignup;
