import PropTypes from "prop-types";
import Tooltip from "@material-ui/core/Tooltip";

const CustomTooltip = ({ children, placement, title }) => (
  <Tooltip
    arrow
    classes={{ tooltip: "tooltip-container", arrow: "tooltip-arrow" }}
    placement={placement}
    title={title}
  >
    {children}
  </Tooltip>
);

CustomTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

CustomTooltip.defaultProps = {
  placement: "top"
};

export default CustomTooltip;
