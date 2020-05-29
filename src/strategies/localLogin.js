import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserByEmail } from "~database/queries";
import { sendError } from "~utils/helpers";
import db from "~database/connection";
import { badCredentials, missingSigninCredentials } from "~messages/errors";

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password"
		},
		async (email, password, next) => {
			const existingUser = await db.oneOrNone(findUserByEmail, [email]);
			if (!existingUser) return next(badCredentials, null);
			// if (!existingUser.verified) throw emailConfirmationReq;

			const validPassword = await bcrypt.compare(
				password,
				existingUser.password
			);
			if (!validPassword) return next(badCredentials, null);

			return next(null, existingUser);
		}
	)
);

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

		const existingUser = await new Promise((resolve, reject) => {
			passport.authenticate("local-login", (err, user) =>
				err ? reject(err) : resolve(user)
			)(req, res, next);
		});

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

		next(req, res);
	} catch (err) {
		sendError(err, res);
	}
};

export default localLogin;
