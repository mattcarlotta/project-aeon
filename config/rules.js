const {
	fontsPublicPath,
	fontsFolder,
	imagesPublicPath,
	imagesFolder
} = require("./paths");
const { jsRule, mediaRule } = require("./helpers");

const { inDevelopment } = process.env;
const inDev = inDevelopment === "true";
const imagesRegex = /\.(jpe?g|png|svg|gif|ico|webp)$/;
const fontsRegex = /\.(woff2|ttf|woff|eot)$/;

module.exports = () => [
	/* lints js files */
	jsRule({
		loader: "eslint-loader",
		options: {
			cache: inDev,
			emitWarning: inDev
		}
	}),
	/* handle image assets */
	mediaRule({
		test: imagesRegex,
		loader: "url-loader",
		options: {
			limit: 8192,
			fallback: "file-loader",
			publicPath: imagesPublicPath,
			outputPath: imagesFolder
		}
	}),
	/* handle font assets */
	mediaRule({
		test: fontsRegex,
		loader: "file-loader",
		options: {
			publicPath: fontsPublicPath,
			outputPath: fontsFolder
		}
	})
];
