import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { emailAlreadyTaken, missingSignupCreds } from "~shared/errors";
import { createDate, sendError } from "~shared/helpers";
import { User } from "~models/instances";

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, next) => {
			try {
				const existingUser = await User.findOne({ email });
				if (existingUser) throw emailAlreadyTaken;

				// hash password before attempting to create the user
				const newPassword = await User.createPassword(password);

				// create new user
				const newUser = await User.createUser({
					...req.body,
					password: newPassword,
					registered: createDate().toDate(),
				});

				next(null, newUser);
			} catch (err) {
				next(err, false);
			}
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
			_id: newUser._id,
			email: newUser.email,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
		};

		next(req, res);
	} catch (err) {
		sendError(err, res);
	}
};

export default localSignup;
