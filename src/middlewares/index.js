/* eslint disable */
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import moment from "moment-timezone";
import passport from "passport";
import session from "cookie-session";
import applyMiddleware from "~middlewares/applyMiddleware";
import { sendError } from "~utils/helpers";

const { inProduction, cookieSecret } = process.env;

export default next => async (req, res) => {
	try {
		morgan.token("date", () => moment().format("MMMM Do YYYY, h:mm:ss a"));

		await applyMiddleware([
			compression({
				level: 6,
				filter: (req, res) =>
					req.headers["x-no-compression"]
						? false
						: compression.filter(req, res),
			}),
			session({
				path: "/",
				name: "app",
				maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 expire after 30 days
				keys: [cookieSecret],
				httpOnly: true,
				// sameSite: inProduction, // specifies same-site cookie attribute enforcement
				// secure: inProduction,
			}),
			morgan(
				inProduction
					? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
					: "tiny",
			),
			passport.initialize(),
			bodyParser.urlencoded({ extended: true }),
		])(req, res);

		return next(req, res);
	} catch (error) {
		return sendError(error, res);
	}
};
/* eslint enable */
