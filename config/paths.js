// =============================================================== //
// WEBPACK PATHS                                                   //
// =============================================================== //

const { PWD } = process.env;
const publicPath = "/_next/static";

module.exports = {
	/* project publicPath */
	publicPath,
	/* public assets */
	assetsPublicPath: `${publicPath}/media/`,
	/* compiled assets next path (next/static/media) */
	assetsFolder: "static/media/",
	/* path to required ant design icons */
	icons: `${PWD}/src/utils/icons/index.js`,
	/* public css */
	cssPublicPath: `${publicPath}/css/`,
	/* compiled CSS next path (next/static/css) */
	cssFolder: "static/css",
	/* analyzed client assets (next/analyze/client.html) */
	analyzeClientPath: "./analyze/client.html",
	/* analyzed server assets (next/analyze/server.html) */
	analyzeServerPath: "../analyze/server.html",
	/* static css assets for development */
	staticCSSDevPath: "static/css/[name].css",
	/* static css assets for production */
	staticCSSProdPath: "static/css/[name].[contenthash:8].css"
};
