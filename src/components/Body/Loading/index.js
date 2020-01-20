/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
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

	animation: loading 1.2s infinite 0s ease-in-out;
	animation-direction: alternate;
	color: #c7c7c7;
	margin-top: 2px;
`;
