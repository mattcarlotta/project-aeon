import Router from "next/router";

/**
 * Helper function to redirect a user client-side or server-side.
 *
 * @function redirect
 * @param {object} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 */
function redirect(res) {
  if (res) {
    res.writeHead(302, { Location: "/signin" });
    res.end();
  } else {
    Router.push("/u/signin");
  }
}

export default redirect;
