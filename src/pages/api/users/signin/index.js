import withMiddleware from "~middlewares";
import { localLogin } from "~strategies";

/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns {object}
 */
const signin = (req, res) => res.status(201).json({ ...req.session.user });

export default withMiddleware(localLogin(signin));
