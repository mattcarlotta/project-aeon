import styled from "styled-components";
import Input from "./Input";

export default styled(Input)`
	position: relative;
	display: inline-block;
	height: 90px;
	width: 100%;

	input {
		position: relative;
		padding: 10px;
		width: 100%;
		font-size: 16px;
		background: #fff;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		transition: border 0.2s ease-in-out;

		&:hover {
			border: 1px solid #bfbebe;
		}

		&::placeholder {
			font-size: 14px;
			color: #ccc;
		}

		&:focus {
			outline: 0;
		}
	}

	.focused {
		svg {
			color: #1e90ff;
		}

		input {
			border: 1px solid #1e90ff;
		}
	}

	.error {
		input {
			border: 1px solid #d14023 !important;
		}
	}

	.disabled {
		input {
			cursor: not-allowed;
			color: rgba(0, 0, 0, 0.25);
			background: #f5f5f5;
			border: 1px solid #e6d8d8;

			&:hover {
				border: 1px solid #e6d8d8;
			}
		}
	}
`;
