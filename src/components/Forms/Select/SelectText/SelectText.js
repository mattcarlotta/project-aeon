import PropTypes from "prop-types";

const SelectText = ({ className, children, handleSelectClick }) => (
	<div className={className} onClick={handleSelectClick}>
		{children}
	</div>
);

SelectText.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	handleSelectClick: PropTypes.func
};

export default SelectText;
