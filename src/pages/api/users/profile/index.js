// import { Router } from "next/router";
import withMiddleware from "~middlewares";
import { User } from "~models/instances";
import { sendError } from "~shared/helpers";
import requireAuth from "~strategies/requireAuth";

/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns {object}
 */
const getProfile = async (req, res) => {
	try {
		const { id: _id } = req.session;

		const signedinUser = await User.findOne({ _id }, { password: 0, __v: 0 });
		if (!signedinUser) throw String("Unable to locate signed in user profile.");

		// Router.push("/login");
		res.status(200).json({ signedinUser });
	} catch (err) {
		return sendError(err, res);
	}
};

export default withMiddleware(requireAuth(getProfile));
