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
			throw missingSignupCreds;

		const { err, newUser } = await db.task("local-signup", async dbtask => {
			const existingUser = await dbtask.oneOrNone(findUserByEmail, [email]);
			if (existingUser) return { err: emailAlreadyTaken, newUser: null };

			const newPassword = await bcrypt.hash(password, 12);
			const token = createRandomToken();
			const { firstname, lastname } = req.body;

			const createdUser = await dbtask.one(createNewUser, [
				email,
				newPassword,
				firstname,
				lastname,
				token
			]);

			return { err: "", newUser: createdUser };
		});
		if (err) throw String(err);

		req.user = {
			firstname: newUser.firstname
		};

		return next(req, res);
	} catch (err) {
		return sendError(err, res);
	}
};

export default localSignup;
