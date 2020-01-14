import withMiddleware from "~middlewares";
import localLogin from "~strategies/localLogin";

/**
 * Allows a user to log in to the application.
 *
 * @function signin
 * @returns {object}
 */
const signin = (req, res) => res.status(201).send(req.session);

export default withMiddleware(localLogin(signin));
