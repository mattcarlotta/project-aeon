import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";

export default withMiddleware(requireAuth((_, res) => res.end()));
