const promise = require("bluebird");
const monitor = require("pg-monitor");
const pgPromise = require("pg-promise");

const initOptions = { promiseLib: promise }; // Database options
const pgp = pgPromise(initOptions); // initialize pg-promise w/options

const { NODE_ENV, DB, DBHOST, DBPASSWORD, DBPORT, DBUSER } = process.env; //

const dbConnection = () => {
	if (NODE_ENV === "development" && monitor.isAttached()) {
		monitor.detach();
		monitor.attach(initOptions, ["query", "error"]);
	} else {
		monitor.attach(initOptions, ["query", "error"]);
	}

	return pgp({
		database: DB,
		host: DBHOST,
		password: DBPASSWORD,
		port: DBPORT,
		user: DBUSER,
	});
};

module.exports = dbConnection();
