# Project Aeon (working title)

a better web app to ask web development questions and use integrated tools to answer them.

## Quick Links

- [Quickstart Linux](#quickstart-linux)
- [Quickstart MacOS](#quickstart-macos)
- [Notes](#notes)

---

## Quickstart Linux

The instructions provided below are specific to Debian 10. For other versions of linux, please see the [PostgreSQL downloads page](https://www.postgresql.org/download/).

### 1. Install NodeJS (minimum v10) and Yarn (v1.x preferred)

- `sudo apt-get install curl python-software-properties`
- `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
- `sudo apt-get update`
- `sudo apt-get install node`
- `sudo npm install -g yarn`

### 2. Install and Configure PostgreSQL (v12 preferred)

- `sudo nano /etc/apt/sources.list.d/pgdg.list` (create pdgd list file)
- `http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main` (sets Debian version to install)
- Press `ctrl + o` to initiate a write and then `y` and `enter` to save the file, then `ctrl + x` to exit
- `wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -` (adds the PostgreSQL Package Repository Key)
- `sudo apt-get update` (updates caches)
- `sudo apt-get install postgresql-12 postgresql-contrib` (installs postgres-12 with additional modules)
- `sudo systemctl start postgresql` (starts PostgreSQL service -- may not be needed if has already been started)
- `sudo -u postgres psql` (logs in to a PostgreSQL shell as super user postgres)
- `psql`(logs into PostgreSQL DB)
- `\password postgres` (will ask to set a password for "postgres"; after pressing enter, it'll prompt for the password)
- `\q` (exits PostgreSQL shell)

### 3. Create a Custom PostgreSQL User (optional)

- `psql -U postgres` (logs into PostgreSQL DB as "postgres", enter newly created "postgres" password when prompted)
- `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';` (creates a new user with a password)
- `ALTER ROLE <username> CREATEDB;` (gives user limited ability to create DBs or `GRANT ALL PRIVILEDGES ON DATABASE <dbname> TO <username>;`)
- `\du` (shows active DB maintainers)
- `\q` (exits PostgreSQL shell)

### 4. Starting PostgreSQL on Boot (optional)

- `sudo systemctl enable postgresql`

### 5. Seed DB and Run Node Server

- `psql -U <username> -f initDB.sql` (only required to initialize the DB, then you can optionally run `npm run seed` for a `development` DB or `npm run seed` for a `dev` DB.)
- `yarn dev` (while at the root directory)

### 6. Install App

- `git clone git@github.com:mattcarlotta/project-aeon.git` (clones the repo)
- `cd project-aeon` (steps into project directory)
- `yarn` (installs dependencies)

---

## Quickstart MacOS

### 1. Install Brew

- `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### 2. Install NodeJS (minimum v10), PostgreSQL (v12 preferred), and Yarn (v1.x preferred)

- `brew update`
- `brew install node`
- `brew install postgresql postgresql-contrib`
- `brew install yarn`

### 3. Configure PostgreSQL

- `sudo -u postgres psql` (logs in to a PostgreSQL shell as super user postgres)
- `psql`(logs into PostgreSQL DB)
- `\password postgres` (will ask to set a password for "postgres"; after pressing enter, it'll prompt for the password)
- `\q` (exits PostgreSQL shell)

### 4. Create a Custom PostgreSQL User (optional)

- `psql -U postgres` (logs into PostgreSQL as "postgres", enter newly created postgres password when prompted)
- `CREATE ROLE <username> WITH LOGIN PASSWORD '<password>';` (creates a new user with a password)
- `ALTER ROLE <username> CREATEDB;` (gives user limited ability to create DBs or `GRANT ALL PRIVILEDGES ON DATABASE <dbname> TO <username>;`)
- `\du` (shows active DB maintainers)
- `\q` (exits PostgreSQL shell)

### 5. Starting PostgreSQL on Boot (optional)

- `brew services start postgresql`

### 6. Seed DB and Run Node Server

- `psql -U <username> -f initDB.sql` (only required to initialize the DB, then you can optionally run `npm run seed` for a `development` DB or `npm run seed:test` for a `test` DB.)
- `npm run dev` (while at the root directory)

### 7. Install App

- `git clone git@github.com:mattcarlotta/project-aeon.git` (clones the repo)
- `cd project-aeon` (steps into project directory)
- `yarn` (installs dependencies)

## Notes

⚠️ If running into authentication failures when attempting to connect to psql for the first time, please follow these steps:

1.) Type `sudo nano /etc/postgresql/12/main/pg_hba.conf` to edit the conf file (if using a version other than 12, change the folder pathing to match the installed version)
2.) Change this line:
`local all postgres peer`
to
`local all postgres md5`
then press `ctrl + o` to initiate a write, then `y`, then `enter` to save the file. Press `ctrl + x` to exit.
3.) Type `sudo service postgresql restart` to restart PostgreSQL.

If still running into issues, then read this [stackoverflow issue](https://stackoverflow.com/questions/18664074/getting-error-peer-authentication-failed-for-user-postgres-when-trying-to-ge) for more information.
