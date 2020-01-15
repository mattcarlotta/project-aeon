import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "~database";
import { findUserByEmail } from "~database/queries";
import { sendError } from "~utils/helpers";
import { badCredentials, missingSigninCredentials } from "~utils/errors";

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, next) => {
			await db.task("local-login", async dbtask => {
				const existingUser = await dbtask.oneOrNone(findUserByEmail, [email]);
				if (!existingUser) return next(badCredentials, null);
				// if (!existingUser.verified) throw emailConfirmationReq;

				const validPassword = await bcrypt.compare(
					password,
					existingUser.password,
				);
				if (!validPassword) return next(badCredentials, null);

				const signedInUser = await dbtask.one(findUserByEmail, [email]);
				return next(null, signedInUser);
			});
		},
	),
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
				err ? reject(err) : resolve(user),
			)(req, res, next);
		});

		req.session = {
			id: existingUser.id,
			email: existingUser.email,
			firstName: existingUser.firstname,
			lastName: existingUser.lastname,
			role: existingUser.role,
		};

		next(req, res);
	} catch (err) {
		sendError(err, res);
	}
};

export default localLogin;
