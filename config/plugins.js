const { DefinePlugin, IgnorePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");
const address = require("address");
const {
	analyzeClientPath,
	analyzeServerPath,
	staticCSSDevPath,
	staticCSSProdPath
} = require("./paths");

const {
	analyze,
	APIURL,
	baseURL,
	cookieSecret,
	DATABASE,
	inDevelopment,
	inStaging,
	inTesting,
	LOCALHOST,
	PORT
} = process.env;

const inDev = inDevelopment === "true";
const filename = inDev ? staticCSSDevPath : staticCSSProdPath;
const chunkFilename = filename;

const REMOTEADDRESS = address.ip();

module.exports = isServer => {
	const plugins = [];

	if (!isServer) {
		plugins.push(
			/* strips out moment locales */
			new IgnorePlugin(/^\.\/locale$/, /moment$/),
			/* extracts css chunks for client */
			new MiniCssExtractPlugin({
				filename,
				chunkFilename
			}),
			/* envs for client */
			new DefinePlugin({
				"process.env": {
					DATABASE: JSON.stringify(DATABASE),
					cookieSecret: JSON.stringify(cookieSecret),
					inDevelopment: inDev,
					inStaging: JSON.stringify(inStaging),
					inTesting: JSON.stringify(inTesting),
					APIURL: JSON.stringify(APIURL),
					baseURL: JSON.stringify(baseURL)
				}
			})
		);
	} else {
		plugins.push(
			/* shows a compilation bar instead of the default compile message */
			new WebpackBar({
				color: "#268bd2",
				minimal: false,
				compiledIn: false
			}),
			/* in console error */
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [
						inDev && `Local development build: \x1b[1m${LOCALHOST}\x1b[0m`,
						inDev &&
							REMOTEADDRESS &&
							`Remote development build: \x1b[1mhttp://${REMOTEADDRESS}:${PORT}\x1b[0m`
					].filter(Boolean),
					notes: [
						inDev && "Note that the development build is not optimized.",
						inDev &&
							"To create a production build, use \x1b[1m\x1b[32myarn build\x1b[0m.\n"
					].filter(Boolean)
				},
				clearConsole: false
			})
		);
	}

	if (analyze) {
		/* analyzes webpack chunk distribution */
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: isServer ? analyzeServerPath : analyzeClientPath
			})
		);
	}

	return plugins;
};
