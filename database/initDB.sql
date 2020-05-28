DROP DATABASE IF EXISTS "myproject-dev";
CREATE DATABASE "myproject-dev";

\c myproject-dev;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id UUID DEFAULT uuid_generate_v1mc() UNIQUE,
	key SERIAL PRIMARY KEY,
	verified BOOLEAN DEFAULT FALSE,
	email VARCHAR NOT NULL UNIQUE,
	firstname TEXT NOT NULL,
	lastname TEXT NOT NULL,
	password VARCHAR NOT NULL UNIQUE,
	registered TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	token VARCHAR NOT NULL UNIQUE,
	reputation BIGINT DEFAULT 0,
	website TEXT, 
	description TEXT,
	displayname TEXT UNIQUE,
 role TEXT DEFAULT 'member'
);
