import styled from "styled-components";

const createCSSStyleProperty = (
	num,
	screenSize
) => `@media (min-width: ${screenSize}) {
	width: ${(num / 24) * 100}%;
	float: left;
}\n
`;

const generateColumns = props => {
	let styleProps = "";
	["xs", "sm", "md", "lg", "xl", "xxl"].forEach(size => {
		const property = props[size];
		if (property)
			styleProps += createCSSStyleProperty(
				property,
				{
					xs: "480px",
					sm: "576px",
					md: "768px",
					lg: "992px",
					xl: "1200px",
					xxl: "1600"
				}[size]
			);
	});

	return styleProps;
};

export default styled.div`
	${props => generateColumns(props)};
`;
