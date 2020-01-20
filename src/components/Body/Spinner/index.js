/* istanbul ignore file */
import styled from "styled-components";
import Spinner from "./Spinner";

export default styled(Spinner)`
	@-webkit-keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes rotate {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	font-size: 0;
	color: #c7c7c7;
	width: 75px;
	height: 75px;

	& .spinner {
		width: 100%;
		height: 100%;
		background-color: transparent;
		border-style: dashed;
		border-width: 4px;
		border-radius: 100%;
		-webkit-animation: rotate 3s linear infinite;
		animation: rotate 3s linear infinite;
	}

	& .spinner::after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: "";
		border: 2px solid currentColor;
		border-radius: 100%;
	}
`;
