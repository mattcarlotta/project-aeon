import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";
import db from "~database/connection";
import { findUserByDisplayName, updateProfile } from "~database/queries";

/**
 * Attempts to update a user's profile.
 *
 * @function updateUserProfile
 * @returns {string} message
 * @throws {string} err
 */
const updateUserProfile = async (req, res) => {
	try {
		const { id, email } = req.session;
		const { firstname, lastname, website, displayname, description } = req.body;
		if (!firstname || !lastname)
			throw String("You must supply at least a first and last name!");

		if (displayname) {
			const existingUser = await db.oneOrNone(findUserByDisplayName, [
				displayname
			]);

			if (existingUser && existingUser.email !== email)
				throw String(
					"That display name is already taken. Please choose a different name."
				);
		}

		await db.none(updateProfile, [
			id,
			displayname,
			firstname,
			lastname,
			website,
			description
		]);

		res.status(201).json({ message: "Successfully update your profile!" });
	} catch (err) {
		return sendError(err, res);
	}
};

export default withMiddleware(requireAuth(updateUserProfile));
