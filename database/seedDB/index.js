/* eslint-disable */
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
require("../../env");
const db = require("../index.js");
const { createNewUser } = require("../queries");

const { DB, SEED } = process.env;

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
  reputation INTEGER DEFAULT 0,
  website TEXT NOT NULL DEFAULT '', 
  description TEXT NOT NULL DEFAULT '',
  displayname TEXT NOT NULL DEFAULT '',
  role TEXT DEFAULT 'member'
)`;

const noteTableOptions = `(
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT false,
  message TEXT NOT NULL DEFAULT '',
  deleted BOOLEAN DEFAULT false
)`;

const avatarTableOptions = `(
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path TEXT DEFAULT NULL
)`;

const questionTableOptions = `(
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  answered BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  title TEXT NOT NULL DEFAULT '',
  uniquetitle VARCHAR NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  tags TEXT [],
  comments JSONB
)`;

const answerTableOptions = `(
  key SERIAL PRIMARY KEY,
  userid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  body TEXT NOT NULL DEFAULT '',
  comments JSONB
)`;

const seedDB = async () => {
  try {
    await db.none(`
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS notifications;
        DROP TABLE IF EXISTS avatars;
        DROP TABLE IF EXISTS questions;
        DROP TABLE IF EXISTS answers;
        CREATE TABLE users ${userTable};
        CREATE TABLE notifications ${noteTableOptions};
        CREATE TABLE avatars ${avatarTableOptions};
        CREATE TABLE questions ${questionTableOptions};
        CREATE TABLE answers ${answerTableOptions};
      `);

    const newPassword = await bcrypt.hash("password", 12);

    await db.none(createNewUser, [
      "carlotta.matt@gmail.com",
      newPassword,
      "Matt",
      "Carlotta",
      "1234567890!@#$%^&*()",
    ]);

    console.log(
      `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" SEED ")} ${chalk.blue(
        `\x1b[2mutils/\x1b[0m\x1b[1mseedDB.js\x1b[0m (${DB})`,
      )}\n`,
    );

    if (SEED) process.exit(0);
  } catch (err) {
    console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
    );

    if (SEED) process.exit(0);
  }
};

if (SEED) seedDB();

module.exports = seedDB;
/* eslint-enable */
