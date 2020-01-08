/* eslint disable */
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import moment from "moment-timezone";
import passport from "passport";
import session from "cookie-session";
import pify from "pify";
import { sendError } from "~shared/helpers";

const { inProduction, cookieSecret } = process.env;

export default next => async (req, res) => {
	try {
		morgan.token("date", () => moment().format("MMMM Do YYYY, h:mm:ss a"));

		await pify(
			compression({
				level: 6,
				filter: (req, res) =>
					req.headers["x-no-compression"]
						? false
						: compression.filter(req, res),
			}),
		)(req, res);

		await pify(
			session({
				path: "/",
				name: "app",
				maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 expire after 30 days, 30days/24hr/60m/60s/1000ms
				keys: [cookieSecret],
				httpOnly: true,
				sameSite: inProduction, // specifies same-site cookie attribute enforcement
				secure: inProduction,
			}),
		)(req, res);

		await pify(
			morgan(
				inProduction
					? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
					: "tiny",
			),
		)(req, res);

		await pify(passport.initialize())(req, res);

		await pify(bodyParser.urlencoded({ extended: true }))(req, res);

		return next(req, res);
	} catch (error) {
		return sendError(error, res);
	}
};
/* eslint enable */
