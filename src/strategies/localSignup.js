import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "~database";
import { createNewUser, findUserByEmail } from "~database/queries";
import { emailAlreadyTaken, missingSignupCreds } from "~utils/errors";
import { createRandomToken, sendError } from "~utils/helpers";

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, next) => {
			await db.task("local-signup", async dbtask => {
				const existingUser = await dbtask.oneOrNone(findUserByEmail, [email]);
				if (existingUser) return next(emailAlreadyTaken, null);

				const newPassword = await bcrypt.hash(password, 12);
				const token = createRandomToken();
				const { firstName, lastName } = req.body;

				const createdUser = await dbtask.one(createNewUser, [
					email,
					newPassword,
					firstName,
					lastName,
					token,
				]);

				return next(null, createdUser);
			});
		},
	),
);

/**
 * Middleware function to register a user.
 *
 * @function localSignup
 * @returns {function}
 * @throws {string}
 */
export const localSignup = next => async (req, res) => {
	try {
		const { email, firstName, lastName, password } = req.body;

		if (!email || !firstName || !lastName || !password)
			throw missingSignupCreds;

		const newUser = await new Promise((resolve, reject) => {
			passport.authenticate("local-signup", (err, user) =>
				err ? reject(err) : resolve(user),
			)(req, res, next);
		});

		req.user = {
			firstName: newUser.firstname,
		};

		next(req, res);
	} catch (err) {
		sendError(err, res);
	}
};

export default localSignup;
