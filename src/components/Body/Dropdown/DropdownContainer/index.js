import styled from "styled-components";

export default styled.div`
	width: 225px;
	display: flex;
	height: 40px;
	border-radius: ${({ isVisible }) => (isVisible ? "4px 4px 0 0" : "4px")};
	border-top: 1px solid #bdbdbd;
	border-left: 1px solid #bdbdbd;
	border-right: 1px solid #bdbdbd;
	border-bottom: 1px solid #bdbdbd;
	transition: all 100ms ease 0s;
	padding: 0 10px;
	cursor: pointer;
`;
