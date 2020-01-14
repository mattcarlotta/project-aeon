import withMiddleware from "~middlewares";
import checkAuth from "~strategies/checkAuth";

/**
 * Allows a user to log in to the application on refresh.
 *
 * @function signedin
 * @returns {object}
 */
const signedin = (req, res) => res.status(201).send(req.session);

export default withMiddleware(checkAuth(signedin));
