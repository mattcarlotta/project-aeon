import get from "lodash/get";
import { User } from "~models/instances";
import { sendError } from "~shared/helpers";
import { badCredentials } from "~shared/errors";

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const _id = get(req, ["session", "id"]);
	if (!_id) return sendError(badCredentials, res);

	const existingUser = await User.findOne({ _id });
	if (!existingUser) return sendError(badCredentials, res);

	next(req, res);
};
