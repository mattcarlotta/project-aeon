/* eslint-disable */
const chalk = require("chalk");
const bcrypt = require("bcryptjs");
require("../../env");
const db = require("../index.js");
const { createNewUser } = require("../queries");

const { DB, SEED } = process.env;

const userTable = `(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc() UNIQUE,
  avatar TEXT NOT NULL DEFAULT '',
  verified BOOLEAN DEFAULT FALSE,
  email VARCHAR NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  password VARCHAR NOT NULL UNIQUE,
  registered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  token VARCHAR NOT NULL UNIQUE,
  reputation INTEGER DEFAULT 0,
  website TEXT NOT NULL DEFAULT '', 
  description TEXT NOT NULL DEFAULT '',
  role TEXT DEFAULT 'member'
)`;

const noteTableOptions = `(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc() UNIQUE,
  uid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  read BOOLEAN DEFAULT false,
  message TEXT NOT NULL DEFAULT '',
  deleted BOOLEAN DEFAULT false
)`;

const avatarTableOptions = `(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc() UNIQUE,
  uid UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  path TEXT DEFAULT NULL
)`;

const questionTableOptions = `(
  id SERIAL PRIMARY KEY,
  uid UUID NOT NULL REFERENCES users(id),
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP WITHOUT TIME ZONE,
  answered BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  upvoters UUID [] DEFAULT array[]::uuid[],
  downvoters UUID [] DEFAULT array[]::uuid[],
  title TEXT NOT NULL DEFAULT '',
  uniquetitle VARCHAR NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  tags TEXT [] DEFAULT array[]::text[],
  deleted BOOLEAN DEFAULT false,
  votes INTEGER DEFAULT 0
)`;

const answerTableOptions = `(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc() UNIQUE,
  uid UUID NOT NULL REFERENCES users(id),
  qid SERIAL REFERENCES questions(id) ON DELETE CASCADE,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP WITHOUT TIME ZONE,
  body TEXT NOT NULL DEFAULT '',
  upvoters UUID [] DEFAULT array[]::uuid[],
  downvoters UUID [] DEFAULT array[]::uuid[],
  deleted BOOLEAN DEFAULT false,
  votes INTEGER DEFAULT 0
)`;

const commentTableOptions = `(
  id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc() UNIQUE,
  uid UUID NOT NULL REFERENCES users(id),
  qid SERIAL REFERENCES questions(id) ON DELETE CASCADE,
  rid TEXT NOT NULL,
  date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP WITHOUT TIME ZONE,
  body TEXT NOT NULL DEFAULT '',
  upvoters UUID [] DEFAULT array[]::uuid[],
  downvoters UUID [] DEFAULT array[]::uuid[],
  votes INTEGER DEFAULT 0
)`;

const seedDB = async () => {
  try {
    await db.none(`
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS notifications;
        DROP TABLE IF EXISTS avatars;
        DROP TABLE IF EXISTS questions CASCADE;
        DROP TABLE IF EXISTS answers;
        DROP TABLE IF EXISTS comments;
        CREATE TABLE users ${userTable};
        CREATE TABLE notifications ${noteTableOptions};
        CREATE TABLE avatars ${avatarTableOptions};
        CREATE TABLE questions ${questionTableOptions};
        CREATE TABLE answers ${answerTableOptions};
        CREATE TABLE comments ${commentTableOptions};
      `);

    const newPassword = await bcrypt.hash("password", 12);

    await db.none(createNewUser, [
      "carlotta.matt@gmail.com",
      newPassword,
      "mc88",
      "Matt",
      "Carlotta",
      "1234567890"
    ]);

    console.log(
      `\n${chalk.rgb(7, 54, 66).bgRgb(38, 139, 210)(" SEED ")} ${chalk.blue(
        `\x1b[2mutils/\x1b[0m\x1b[1mseedDB.js\x1b[0m (${DB})`
      )}\n`
    );

    if (SEED) process.exit(0);
  } catch (err) {
    console.log(
      `\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`
    );

    if (SEED) process.exit(0);
  }
};

if (SEED) seedDB();

module.exports = seedDB;
/* eslint-enable */
