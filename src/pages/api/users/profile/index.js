import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";

/**
 * Retrieves logged in user app settings.
 *
 * @function getProfile
 * @returns {res}
 */
const getProfile = async (req, res) =>
	res.status(200).json({ signedinUser: req.user });

export default withMiddleware(requireAuth(getProfile));
