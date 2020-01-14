import withMiddleware from "~middlewares";
import localSignup from "~strategies/localSignup";

const signup = (req, res) => {
	res.status(201).json({
		message: `Thank you for your registering ${req.user.firstName}! You're all set. When you're ready, feel free to log into your account.`,
	});
};

export default withMiddleware(localSignup(signup));
