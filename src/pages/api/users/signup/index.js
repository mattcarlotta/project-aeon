import withMiddleware from "~middlewares";
import { localSignup } from "~strategies";

const signup = (_, res) => {
	res.status(201).json({
		message:
			"Thank you for your registering! You're all set. When you're ready, feel free to log into your account.",
	});
};

export default withMiddleware(localSignup(signup));
