import PropTypes from "prop-types";

const StopPropagation = ({ children }) => (
  <span onClick={e => e.stopPropagation()}>{children}</span>
);

StopPropagation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StopPropagation;
