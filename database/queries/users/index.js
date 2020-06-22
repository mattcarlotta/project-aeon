module.exports = {
  createNewUser:
    "INSERT INTO users(email, password, username, firstname, lastname, token) VALUES ($1, $2, $3, $4, $5, $6)",
  findUserByEmail: "SELECT email FROM users WHERE email=$1",
  findUserById:
    "SELECT id,avatar,verified,email,username,firstname,lastname,registered,role,reputation,description,website FROM users WHERE id=$1",
  findUserByUsername: "SELECT * FROM users WHERE username=$1",
  updateProfile:
    "UPDATE users SET username=$2,firstname=$3,lastname=$4,website=$5,description=$6 WHERE id=$1",
};
