import withMiddleware from "~middlewares";
import { clearSession } from "~utils/helpers";

const signout = (req, res) => clearSession(req, res, 200);

export default withMiddleware(signout);
