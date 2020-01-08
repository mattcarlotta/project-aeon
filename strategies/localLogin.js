import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "~models/instances";
import { sendError } from "~shared/helpers";
import { badCredentials, missingSigninCredentials } from "~shared/errors";

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, next) => {
			try {
				// see if the user exists
				const existingUser = await User.findOne({ email });
				if (!existingUser) throw badCredentials;

				// compare password to existingUser password
				const validPassword = await bcrypt.compare(
					password,
					existingUser.password,
				);
				if (!validPassword) throw badCredentials;

				next(null, existingUser);
			} catch (err) {
				next(err, false);
			}
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
			id: existingUser._id.toString(),
			email: existingUser.email,
			firstName: existingUser.firstName,
			lastName: existingUser.lastName,
			role: existingUser.role,
		};

		next(req, res);
	} catch (err) {
		sendError(err, res);
	}
};

export default localLogin;
