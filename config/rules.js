const {
	fontsPublicPath,
	fontsFolder,
	imagesPublicPath,
	imagesFolder,
} = require("./paths");
const { jsRule, mediaRule, styleRule } = require("./helpers");

const { inDevelopment } = process.env;

const inDev = inDevelopment === "true";

const imagesRegex = /\.(jpe?g|png|svg|gif|ico|webp)$/;
const fontsRegex = /\.(woff2|ttf|woff|eot)$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
const scssRegex = /\.scss$/;
const scssModuleRegex = /\.module\.scss$/;
const sassRegex = /\.sass$/;
const sassModuleRegex = /\.module\.sass$/;

const styleRules = [
	{
		/* handles global CSS imports */
		test: cssRegex,
		exclude: cssModuleRegex,
		loaders: ["sass-loader"],
	},
	{
		/* handles CSS module imports */
		test: cssRegex,
		include: cssModuleRegex,
		modules: true,
		loaders: ["sass-loader"],
	},
	{
		/* handles global less imports */
		test: lessRegex,
		exclude: lessModuleRegex,
		loaders: [
			{
				loader: "less-loader",
				options: {
					javascriptEnabled: true,
				},
			},
		],
	},
	{
		/* handles less module imports */
		test: lessRegex,
		include: [lessModuleRegex],
		modules: true,
		loaders: [
			{
				loader: "less-loader",
				options: {
					javascriptEnabled: true,
				},
			},
		],
	},
	{
		/* handles global SCSS imports */
		test: scssRegex,
		exclude: scssModuleRegex,
		loaders: ["sass-loader"],
	},
	{
		/* handles SCSS module imports */
		test: scssRegex,
		include: scssModuleRegex,
		modules: true,
		loaders: ["sass-loader"],
	},
	{
		/* handles global SASS imports */
		test: sassRegex,
		exclude: sassModuleRegex,
		loaders: ["sass-loader"],
	},
	{
		/* handles SASS module imports */
		test: sassRegex,
		include: sassModuleRegex,
		modules: true,
		loaders: ["sass-loader"],
	},
];

module.exports = isServer => [
	/* lints js files */
	jsRule({
		loader: "eslint-loader",
		options: {
			cache: inDev,
			emitWarning: inDev,
		},
	}),
	/* handle image assets */
	mediaRule({
		test: imagesRegex,
		loader: "url-loader",
		options: {
			limit: 8192,
			fallback: "file-loader",
			publicPath: imagesPublicPath,
			outputPath: imagesFolder,
		},
	}),
	/* handle font assets */
	mediaRule({
		test: fontsRegex,
		loader: "file-loader",
		options: {
			publicPath: fontsPublicPath,
			outputPath: fontsFolder,
		},
	}),
	...styleRules.map(options => styleRule({ ...options, isServer })),
];
