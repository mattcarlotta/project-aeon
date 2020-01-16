const userQueries = {
	createNewUser:
		"INSERT INTO users(email, password, firstName, lastName, token) VALUES ($1, $2, $3, $4, $5) RETURNING firstName",
	findUserByEmail: "SELECT * FROM users WHERE email=$1",
	findUserById:
		"SELECT id,verified,email,displayName,firstName,lastName,registered,role,reputation,description FROM users WHERE id=$1",
};

module.exports = {
	...userQueries,
};
