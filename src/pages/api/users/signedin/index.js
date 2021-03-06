import withMiddleware from "~middlewares";
import checkAuth from "~strategies/checkAuth";

/**
 * Allows a user to log in to the application on refresh.
 *
 * @function signedin
 * @returns {object}
 */
const signedin = (req, res) => res.status(200).send(req.user);

export default withMiddleware(checkAuth(signedin));
