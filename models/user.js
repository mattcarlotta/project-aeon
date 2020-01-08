const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
	email: { type: String, unique: true, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: "subscriber" },
	registered: { type: Date, required: true },
});

userSchema.statics.createUser = function newUser(user) {
	return this.create(user);
};

// Generate a salt, password, then run callback
userSchema.statics.createPassword = async function createNewPassword(password) {
	const salt = await bcrypt.genSalt(12);
	return bcrypt.hash(password, salt, null);
};

// Set a compare password method on the model
userSchema.methods.comparePassword = function compareNewPassword(
	incomingPassword,
) {
	return bcrypt.compare(incomingPassword, this.password);
};

module.exports = model("user", userSchema);
