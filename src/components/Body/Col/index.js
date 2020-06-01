// import styled from "styled-components";

import styled from "styled-components";

/*

@media (min-width: 768px)
.ant-col-md-24 {
    display: block;
    box-sizing: border-box;
    width: 100%;
}
*/

const generateColumns = props => {
	const sizes = ["xs", "sm", "md", "lg", "xl", "xxl"];
	const screens = {
		xs: "480px",
		sm: "576px",
		md: "768px",
		lg: "992px",
		xl: "1200px",
		xxl: "1600"
	};

	const genStyle = (num, screenSize) => `@media (min-width: ${screenSize}) {
    width: ${(num / 24) * 100}%;
    float: left;
  }\n
  `;

	let styleProps = "";
	sizes.forEach(size => {
		const property = props[size];
		if (property) styleProps += genStyle(property, screens[size]);
	});

	return styleProps;
};

export default styled.div`
	${props => generateColumns(props)};
`;
