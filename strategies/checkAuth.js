import get from "lodash/get";
import { User } from "~models/instances";
import { clearSession } from "~shared/helpers";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const _id = get(req, ["session", "user", "_id"]);
	if (!_id) return clearSession(req, res, 200);

	const existingUser = await User.findOne({ _id });
	if (!existingUser) return clearSession(req, res, 200);

	next(req, res);
};
