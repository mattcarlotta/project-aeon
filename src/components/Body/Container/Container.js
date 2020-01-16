import React from "react";
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

export default Container;
