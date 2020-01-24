import styled from "styled-components";
import PropTypes from "prop-types";

const Loading = ({ className }) => <div className={className}>Loading</div>;

Loading.propTypes = { className: PropTypes.string.isRequired };

export default styled(Loading)`
	@-webkit-keyframes loading {
		0% {
			opacity: 1;
			letter-spacing: 2px;
		}
		100% {
			opacity: 0.5;
			letter-spacing: auto;
		}
	}
	@keyframes loading {
		0% {
			opacity: 1;
			letter-spacing: 2px;
		}
		100% {
			opacity: 0.5;
			letter-spacing: auto;
		}
	}

	-webkit-animation: loading 1.2s infinite 0s ease-in-out;
	animation: loading 1.2s infinite 0s ease-in-out;
	-webkit-animation-direction: alternate;
	animation-direction: alternate;
	position: relative;
	top: -62px;
	color: #c7c7c7;
	margin-top: 2px;
`;
