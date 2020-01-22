/* eslint-disable */
require("../env");
const db = require("./index.js");

const { SEED } = process.env;

const userTable = `(
  id UUID DEFAULT uuid_generate_v1mc() UNIQUE,
	key SERIAL PRIMARY KEY,
	avatar TEXT NOT NULL DEFAULT '',
	verified BOOLEAN DEFAULT FALSE,
	email VARCHAR NOT NULL UNIQUE,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	password VARCHAR NOT NULL UNIQUE,
	registered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	token VARCHAR NOT NULL UNIQUE,
	reputation BIGINT DEFAULT 0,
	website TEXT NOT NULL DEFAULT '', 
	description TEXT NOT NULL DEFAULT '',
	displayname TEXT NOT NULL DEFAULT '',
  role TEXT DEFAULT 'member'
)`;

const seedDB = async () => {
	try {
		await db.task("seed-database", async dbtask => {
			// create DB tables
			await dbtask.none(`
        DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users ${userTable};
      `);

			return console.log(
				"\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mseedDB.js",
			);
		});
	} catch (err) {
		return console.log(
			"\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n" +
				err.toString() +
				"\x1b[0m",
		);
	} finally {
		if (SEED) process.exit(0);
	}
};

if (SEED) seedDB();

module.exports = seedDB;
/* eslint-enable */
