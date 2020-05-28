import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "~database/connection";
import { createNewUser, findUserByEmail } from "~database/queries";
import { emailAlreadyTaken, missingSignupCreds } from "~messages/errors";
import { createRandomToken, sendError } from "~utils/helpers";

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, next) => {
			await db.task("local-signup", async dbtask => {
				const existingUser = await dbtask.oneOrNone(findUserByEmail, [email]);
				if (existingUser) return next(emailAlreadyTaken, null);

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

				return next(null, createdUser);
			});
		}
	)
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
		const { email, firstname, lastname, password } = req.body;

		if (!email || !firstname || !lastname || !password)
			throw missingSignupCreds;

		const newUser = await new Promise((resolve, reject) => {
			passport.authenticate("local-signup", (err, user) =>
				err ? reject(err) : resolve(user)
			)(req, res, next);
		});

		req.user = {
			firstname: newUser.firstname
		};

		return next(req, res);
	} catch (err) {
		return sendError(err, res);
	}
};

export default localSignup;
