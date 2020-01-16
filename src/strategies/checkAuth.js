import getConfig from "next/config";
import { findUserById } from "~database/queries";
import { clearSession, parseSession } from "~utils/helpers";

const { db } = getConfig().publicRuntimeConfig;

/**
 * Middleware function to check if a user is logged into a session and the session is valid.
 *
 * @function
 * @returns {function}
 */
export default next => async (req, res) => {
	const id = parseSession(req);
	if (!id) return clearSession(req, res, 200);

	const existingUser = await db.oneOrNone(findUserById, [id]);
	if (!existingUser) return clearSession(req, res, 200);

	next(req, res);
};
