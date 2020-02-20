/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	@-webkit-keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	height: 100%;
	-webkit-animation: ${({ timing }) =>
		`fadeIn ${timing || "1s"} 0s ease-in-out forwards`};
	animation: ${({ timing }) =>
		`fadeIn ${timing || "1s"} 0s ease-in-out forwards`};
`;
