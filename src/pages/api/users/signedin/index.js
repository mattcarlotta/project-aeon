import withMiddleware from "~middlewares";
import { checkAuth } from "~strategies";

/**
 * Allows a user to log in to the application on refresh.
 *
 * @function signedin
 * @returns {object}
 */
const signedin = (req, res) => res.status(201).json({ ...req.session.user });

export default withMiddleware(checkAuth(signedin));
