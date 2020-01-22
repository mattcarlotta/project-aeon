import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = ({ className, children, style }) => (
	<div className={className} style={style}>
		{children}
	</div>
);

Container.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default styled(Container)`
	width: 100%;
	padding: 10px;
	text-align: left;
	border-radius: 4px;
	background: #fff;
	-webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
		0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
	box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
		0 1px 3px 0 rgba(0, 0, 0, 0.12);
	padding-bottom: 30px;
	margin-bottom: 20px;
`;
