import bcrypt from "bcryptjs";
import { findUserByEmail } from "~database/queries";
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
		const { email, password } = req.body;
		if (!email || !password) throw missingSigninCredentials;

		const existingUser = await db.oneOrNone(findUserByEmail, [email]);
		if (!existingUser) throw badCredentials;
		// if (!existingUser.verified) throw emailConfirmationReq;

		const validPassword = await bcrypt.compare(password, existingUser.password);
		if (!validPassword) throw badCredentials;

		req.session = {
			id: existingUser.id,
			avatar: existingUser.avatar,
			email: existingUser.email,
			firstname: existingUser.firstname,
			description: existingUser.description,
			displayname: existingUser.displayname,
			lastname: existingUser.lastname,
			role: existingUser.role,
			registered: existingUser.registered,
			reputation: existingUser.reputation,
			website: existingUser.website
		};

		return next(req, res);
	} catch (err) {
		return sendError(err, res);
	}
};

export default localLogin;
