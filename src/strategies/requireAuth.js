import getConfig from "next/config";
import { findUserById } from "~database/queries";
import { parseSession, sendError } from "~utils/helpers";
import { badCredentials } from "~utils/errors";

const { db } = getConfig().publicRuntimeConfig;

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const id = parseSession(req);
	if (!id) return sendError(badCredentials, res);

	const existingUser = await db.oneOrNone(findUserById, [id]);
	if (!existingUser) return sendError(badCredentials, res);

	req.user = existingUser;

	next(req, res);
};
