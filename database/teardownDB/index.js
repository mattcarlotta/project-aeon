/* eslint-disable */
const chalk = require("chalk");
require("../../env");
const db = require("../index.js");

const { DB, EXIT } = process.env;

const teardownDB = async () => {
  try {
    await db.none(`
        DROP TABLE IF EXISTS users CASCADE;
        `);

    console.log(
      `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" PASS ")} ${chalk.blue(
        `\x1b[2mutils/\x1b[0m\x1b[1mteardownDB.js\x1b[0m (${DB})`
      )}\n`
    );

    if (EXIT) process.exit(0);
  } catch (err) {
    console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mteardownDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`
    );
    return reject(process.exit(0));
  }
};

if (EXIT) teardownDB();

module.exports = teardownDB;
/* eslint-enable */
