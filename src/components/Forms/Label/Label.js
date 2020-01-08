import React from "react";
import PropTypes from "prop-types";

const Label = ({ className, name, label, style }) => (
	<label className={className} style={style} htmlFor={name}>
		{label}:
	</label>
);

Label.propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.string,
	name: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default Label;
