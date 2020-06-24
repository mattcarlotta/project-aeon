import get from "lodash.get";
import isEmpty from "lodash.isempty";
import remark from "remark";
import strip from "strip-markdown";

/**
 * Helper function to parse data from an API response.
 *
 * @function
 * @param {array} res - an API response.
 * @returns {object} - a parsed data object from res.data.
 */
export function parseData(res) {
  return get(res, ["data"]);
}

/**
 * Helper function to parse a cookie from an API request.
 *
 * @function parseCookie
 * @param {array} req - an API request.
 * @returns {string} - a string cookie from req.headers.cookie.
 */
export function parseCookie(req) {
  const cookie = get(req, ["headers", "cookie"]);
  return cookie ? { headers: { cookie } } : undefined;
}

/**
 * Helper function to parse a fields' [name]: value from an array into an object.
 *
 * @function parseFields
 * @param {array} fields - an array containing fields.
 * @returns {object} - parsed fields with [name]: value.
 * @throws {error}
 */
export function parseFields(fields) {
  try {
    if (isEmpty(fields)) throw new Error("You must supply an array of fields!");

    const parsedFields = fields.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});

    return parsedFields;
  } catch (err) {
    return err.toString();
  }
}

/**
 * Helper function to parse a message from an API response.
 *
 * @function parseMessage
 * @param {array} res - an API response.
 * @returns {string} - a parsed message string from res.data.message.
 */
export function parseMessage(res) {
  return get(res, ["data", "message"]);
}

/**
 * Helper function to limit a string to 500 characters.
 *
 * @function truncate
 * @param {array} str - a plain text string
 * @returns {string} - a truncated plain text string
 */
const truncate = str =>
  str.length > 500 ? str.substr(0, 500 - 1).concat("...") : str;

/**
 * Helper function to strip markdown to plain text and limit string to 500 characters.
 *
 * @function parseMarkdown
 * @param {string} body - markdown text
 * @returns {string} - plain text limited to 500 characters.
 */
export async function parseMarkdown(body) {
  let string = "";
  try {
    string = await new Promise((res, rej) => {
      remark()
        .use(strip)
        .process(body, (err, { contents }) => (err ? rej(err) : res(contents)));
    });
  } catch (e) {
    string = "Unable to parse.";
  }

  return truncate(string)
    .replace(/^(\n{2,})/gm, "")
    .replace(/\n$/, "");
}
