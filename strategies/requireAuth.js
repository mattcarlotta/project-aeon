import get from "lodash/get";
import { User } from "~models/instances";
import { sendError } from "~shared/helpers";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	try {
		const _id = get(req, ["session", "user", "_id"]);
		if (!_id) throw badCredentials;

		const existingUser = await User.findOne({ _id });
		if (!existingUser) throw badCredentials;

		next(req, res);
	} catch (err) {
		sendError(err, res);
	}
};
