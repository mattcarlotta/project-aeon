const userQueries = {
	createNewUser:
		"INSERT INTO users(email, password, firstName, lastName, token) VALUES ($1, $2, $3, $4, $5) RETURNING firstName",
	findUserByEmail: "SELECT * FROM users WHERE email=$1",
	findUserByDisplayName: "SELECT displayName FROM users WHERE displayName=$1",
	findUserById:
		"SELECT id,verified,email,displayName,firstName,lastName,registered,role,reputation,description,website FROM users WHERE id=$1",
	updateProfile:
		"UPDATE users SET displayName=$2,firstName=$3,lastName=$4,website=$5,description=$6 WHERE id=$1",
};

module.exports = {
	...userQueries,
};
