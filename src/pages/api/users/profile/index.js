import withMiddleware from "~middlewares";
import db from "~database";
import { findUserById } from "~database/queries";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";

/**
 * Retrieves logged in user app settings.
 *
 * @function getProfile
 * @returns {res}
 */
const getProfile = async (req, res) => {
	try {
		const { id } = req.session;

		const signedinUser = await db.oneOrNone(findUserById, [id]);
		if (!signedinUser) throw String("Unable to locate signed in user profile.");

		res.status(200).json({ signedinUser });
	} catch (err) {
		return sendError(err, res);
	}
};

export default withMiddleware(requireAuth(getProfile));
