import styled from "styled-components";
import PropTypes from "prop-types";

const Spin = ({ className }) => (
	<div className={className}>
		{[0, 1, 2].map(key => (
			<span key={key} />
		))}
	</div>
);

Spin.propTypes = {
	className: PropTypes.string.isRequired
};

export default styled(Spin)`
	@keyframes loading {
		0% {
			background: rgba(0, 0, 0, 0.25);
		}
		25% {
			background: #188fff;
		}
		50% {
			background: rgba(0, 0, 0, 0.25);
		}
		100% {
			background: rgba(0, 0, 0, 0.25);
		}
	}

	display: flex;
	flex-direction: row;
	align-items: center;
	height: 30px;
	width: 42px;
	margin: 0 auto;

	& span {
		display: flex;
		width: 9px;
		height: 15px;
		margin-right: 5px;
		background: rgba(0, 0, 0, 0.25);
		animation: loading 1.35s infinite ease-in;
	}

	& span:nth-child(2) {
		animation-delay: 0.2s;
	}

	& span:nth-child(3) {
		animation-delay: 0.4s;
	}
`;
