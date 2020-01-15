import moment from "moment-timezone";
import random from "lodash/random";
import get from "lodash/get";

const tokenGenerator = (str, tlen) => {
	const arr = [...str];
	const max = arr.length - 1;
	let token = "";
	for (let i = 0; i < tlen; i += 1) {
		const int = random(max);
		token += arr[int];
	}
	return token;
};

/**
 * Helper function to clear the user session.
 *
 * @function clearSession
 * @param {object} req
 * @param {object} res
 * @param {number} status
 * @param {string} err
 * @returns {response}
 */
const clearSession = (req, res, status, err) => {
	req.session = null;

	res.status(status).json({ role: "guest", err });
};

/**
 * Helper function to create a current date.
 *
 * @function createDate
 * @returns {Date}
 */
const createDate = date => moment(date || Date.now()).tz("America/Los_Angeles");

/**
 * Helper function to create a random string.
 *
 * @function createRandomToken
 * @returns {String}
 */
const createRandomToken = () =>
	tokenGenerator(
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$/.",
		64,
	);

/**
 * Helper function to parse req.session.
 *
 * @function parseSession
 * @returns {string}
 */
const parseSession = req => get(req, ["session", "id"]);

/**
 * Helper function to send an error to the client.
 *
 * @function sendError
 * @returns {function}
 */
const sendError = (err, res) => res.status(400).json({ err: err.toString() });

/**
 * Helper function to check if an array contains duplicate values.
 *
 * @function uniqueArray
 * @returns {bool}
 */
const uniqueArray = arr => arr.length === new Set(arr).size;

export {
	clearSession,
	createDate,
	createRandomToken,
	parseSession,
	sendError,
	uniqueArray,
};
