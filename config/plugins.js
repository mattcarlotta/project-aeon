const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const {
	analyzeClientPath,
	analyzeServerPath,
	staticCSSDevPath,
	staticCSSProdPath,
} = require("./paths");

const {
	analyze,
	baseURL,
	cookieSecret,
	DATABASE,
	inDevelopment,
	inTesting,
} = process.env;

const inDev = inDevelopment === "true";
const filename = inDev ? staticCSSDevPath : staticCSSProdPath;
const chunkFilename = filename;

module.exports = isServer => {
	const plugins = [];

	if (!isServer) {
		plugins.push(
			/* extracts css chunks for client */
			new MiniCssExtractPlugin({
				filename,
				chunkFilename,
			}),
			/* envs for client */
			new DefinePlugin({
				"process.env": {
					DATABASE: JSON.stringify(DATABASE),
					cookieSecret: JSON.stringify(cookieSecret),
					inDevelopment: inDev,
					inTesting: JSON.stringify(inTesting),
					baseURL: JSON.stringify(baseURL),
				},
			}),
		);
	}

	plugins.push(new ErrorOverlayPlugin());

	if (analyze) {
		/* analyzes webpack chunk distribution */
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: isServer ? analyzeServerPath : analyzeClientPath,
			}),
		);
	}

	return plugins;
};
