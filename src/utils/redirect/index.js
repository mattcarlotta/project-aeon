import Router from "next/router";

/**
 * Helper function to parse a message from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 */
function redirect(res) {
	if (res) {
		res.writeHead(302, { Location: "/signin" });
		res.end();
	} else {
		Router.push("/signin");
	}
}

export default redirect;
