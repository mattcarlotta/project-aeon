require("./env");
const db = require("./database");
const openBrowser = require("react-dev-utils/openBrowser");
const { antConfig, paths, plugins, rules } = require("./config");

const { inDevelopment, LOCALHOST } = process.env;

/* opens a browser window */
if (inDevelopment) openBrowser(LOCALHOST);

module.exports = {
	publicRuntimeConfig: {
		db
	},
	webpack(config, { isServer }) {
		/* adds custom aliased extensions */
		// config.resolve.extensions.push(".css", ".sass", ".scss");

		/* adds custom rules to client and server */
		config.module.rules.push(...rules());

		/* exports specific antd icons */
		if (!isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
				"@ant-design/icons$": paths.icons
			};
		}

		/* adds custom rules to handle ant's css imports */
		antConfig(config, isServer);

		/* adds custom plugins to client and server */
		config.plugins.push(...plugins(isServer));

		/* return new config to next */
		return config;
	}
};
