import getConfig from "next/config";
import withMiddleware from "~middlewares";
import requireAuth from "~strategies/requireAuth";
import { sendError } from "~utils/helpers";
import { findUserByDisplayName, updateProfile } from "~database/queries";

const { db } = getConfig().publicRuntimeConfig;

/**
 * Attempts to update a user's profile.
 *
 * @function updateUserProfile
 * @returns {string} message
 * @throws {string} err
 */
const updateUserProfile = async (req, res) => {
	try {
		const { id } = req.session;
		const { firstName, lastName, website, displayName, description } = req.body;
		if (!firstName || !lastName)
			throw String("You must supply at least a first and last name!");

		if (displayName) {
			const existingUser = await db.oneOrNone(findUserByDisplayName, [
				displayName,
			]);
			if (existingUser && displayName !== existingUser.displayname)
				throw String(
					"That display name is already taken. Please choose a different name.",
				);
		}

		await db.none(updateProfile, [
			id,
			displayName,
			firstName,
			lastName,
			website,
			description,
		]);

		res.status(200).json({ message: "Successfully update your profile!" });
	} catch (err) {
		return sendError(err, res);
	}
};

export default withMiddleware(requireAuth(updateUserProfile));
