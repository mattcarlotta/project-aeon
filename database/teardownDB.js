/* eslint-disable */
require("../env");
const db = require("./index.js");

const { DROP, WATCHING } = process.env;

const teardownDB = async () => {
	await db.task("teardown-db", async dbtask => {
		try {
			await dbtask.none(`
        DROP TABLE IF EXISTS users CASCADE;
        `);

			return console.log(
				"\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mteardownDB.js",
			);
		} catch (err) {
			return console.log(
				`\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mteardownDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
			);
		} finally {
			if (DROP) process.exit(0);
			if (!WATCHING) {
				db.$pool.end();
				process.exit(0);
			}
		}
	});
};

if (DROP) teardownDB();

module.exports = teardownDB;
/* eslint-enable */
