import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { resetMessages } from "~actions/Messages";

export class ServerMessages extends Component {
	shouldComponentUpdate = nextProps =>
		nextProps.serverMessage !== this.props.serverMessage;

	componentDidUpdate = prevProps => {
		const { serverError, serverMessage } = this.props;

		if (
			(prevProps.serverMessage !== serverMessage && serverMessage !== "") ||
			(prevProps.serverError !== serverError && serverError !== "")
		) {
			clearTimeout(this.timeout);
			this.setTimer();
		}
	};

	componentWillUnmount = () => this.clearTimer();

	clearTimer = () => {
		clearTimeout(this.timeout);
		this.props.resetMessages();
	};

	setTimer = () => (this.timeout = setTimeout(this.clearTimer, 2000));

	render = () => (
		<ToastContainer
			position="top-right"
			autoClose={8000}
			hideProgressBar={false}
			newestOnTop={false}
			draggable={false}
			pauseOnVisibilityChange
			closeOnClick
			pauseOnHover
		/>
	);
}

ServerMessages.propTypes = {
	resetMessages: PropTypes.func.isRequired,
	serverError: PropTypes.string,
	serverMessage: PropTypes.string
};

const mapStateToProps = ({ messages }) => ({
	serverError: messages.error,
	serverMessage: messages.message
});

const mapDispatchToProps = {
	resetMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMessages);
