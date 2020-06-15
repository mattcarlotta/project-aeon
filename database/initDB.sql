DROP DATABASE IF EXISTS "myproject-dev";
CREATE DATABASE "myproject-dev";

\c myproject-dev;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users CASCADE;

