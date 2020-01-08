import moment from "moment-timezone";
import { Types } from "mongoose";

const { ObjectId } = Types;

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
 * Helper function to generate a mongo ObjectId.
 *
 * @function convertId
 * @returns {ObjectId}
 */
const convertId = id => ObjectId(id);

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

export { clearSession, convertId, createDate, sendError, uniqueArray };
