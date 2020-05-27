/* eslint disable */
import morgan from "morgan";
import passport from "passport";
import session from "cookie-session";
import { sendError } from "~utils/helpers";

const { NODE_ENV, cookieSecret, inStaging } = process.env;
const inProduction = NODE_ENV === "production";

export default next => async (req, res) => {
	try {
		const middlewares = [
			session({
				path: "/",
				name: "app",
				maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 expire after 30 days
				keys: [cookieSecret],
				httpOnly: true,
				secure: inProduction && !inStaging,
				sameSite: inProduction && !inStaging,
			}),
			inProduction && morgan("tiny"),
			passport.initialize(),
		];

		const promises = middlewares.reduce((acc, middleware) => {
			const promise = new Promise((resolve, reject) => {
				middleware(req, res, result =>
					result instanceof Error ? reject(result) : resolve(result),
				);
			});
			return [...acc, promise];
		}, []);

		await Promise.all(promises);

		return next(req, res);
	} catch (error) {
		return sendError(error, res);
	}
};
/* eslint enable */
