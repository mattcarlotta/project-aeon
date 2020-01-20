/* istanbul ignore file */
import styled from "styled-components";
import Spinner from "./Spinner";

export default styled(Spinner)`
	@-webkit-keyframes cog-rotate {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes cog-rotate {
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
		-webkit-animation: cog-rotate 3s linear infinite;
		-moz-animation: cog-rotate 3s linear infinite;
		-o-animation: cog-rotate 3s linear infinite;
		animation: cog-rotate 3s linear infinite;
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

/*
	margin: 0;
	padding: 0;
	font-weight: 100;
	font-size: 30px;
	color: #c7c7c7;
	span {
		position: relative;
		top: 0.5px;
		display: inline-block;
		text-transform: uppercase;
		opacity: 0;
		transform: rotateX(-90deg);
	}

	.letter {
		-webkit-animation: drop 1.2s ease-in-out infinite;
		animation: drop 1.2s ease-in-out infinite;
	}

	.l {
		-webkit-animation-delay: 1.2s;
		animation-delay: 1.2s;
	}

	.o {
		-webkit-animation-delay: 1.3s;
		animation-delay: 1.3s;
	}

	.a {
		-webkit-animation-delay: 1.4s;
		animation-delay: 1.4s;
	}

	.d {
		-webkit-animation-delay: 1.5s;
		animation-delay: 1.5s;
	}

	.i {
		-webkit-animation-delay: 1.6s;
		animation-delay: 1.6s;
	}

	.n {
		-webkit-animation-delay: 1.7s;
		animation-delay: 1.7s;
	}

	.g {
		-webkit-animation-delay: 1.8s;
		animation-delay: 1.8s;
	}
*/
