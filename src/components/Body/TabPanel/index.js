import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TabPanel = ({ children, className, index, value }) => (
	<div
		className={className}
		hidden={value !== index}
		role="tabpanel"
		id={`simple-tabpanel-${index}`}
		aria-labelledby={`simple-tab-${index}`}
	>
		{value === index && children}
	</div>
);

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

export default styled(TabPanel)`
	padding: 10px;
	min-height: 478px;
`;
