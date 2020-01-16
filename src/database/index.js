const promise = require("bluebird");
const monitor = require("pg-monitor");
const pgPromise = require("pg-promise");

const initOptions = { promiseLib: promise, noWarnings: false }; // Database options
const pgp = pgPromise(initOptions); // initialize pg-promise w/options

const { NODE_ENV, DB, DBHOST, DBPASSWORD, DBPORT, DBUSER } = process.env; //

if (NODE_ENV === "development") {
	monitor.attach(initOptions, ["query", "error"]);
} else {
	monitor.attach(initOptions, ["error"]);
}

module.exports = pgp({
	database: DB,
	host: DBHOST,
	password: DBPASSWORD,
	port: DBPORT,
	user: DBUSER,
});
