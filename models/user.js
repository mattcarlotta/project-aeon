const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	email: { type: String, unique: true, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: "subscriber" },
});

module.exports = model("user", userSchema);
