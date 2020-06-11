const { assetsPublicPath, assetsFolder } = require("./paths");
const { jsRule, mediaRule } = require("./helpers");

const { inDevelopment } = process.env;
const inDev = inDevelopment === "true";
const staticAssetsRegex = /\.(jpe?g|png|svg|gif|ico|webp|woff2|ttf|woff|eot)$/;

module.exports = () => [
  /* lints js files */
  jsRule({
    loader: "eslint-loader",
    options: {
      cache: inDev,
      emitWarning: inDev,
    },
  }),
  /* handle static assets */
  mediaRule({
    test: staticAssetsRegex,
    loader: "url-loader",
    options: {
      limit: 8192,
      fallback: "file-loader",
      publicPath: assetsPublicPath,
      outputPath: assetsFolder,
    },
  }),
];
