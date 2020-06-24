import PropTypes from "prop-types";
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle
} from "react-icons/fa";
import styled from "styled-components";

const style = {
  margin: "13px 8px"
};

export const displayIcon = type => {
  switch (type) {
    case "success":
      return <FaCheck style={style} />;
    case "info":
      return <FaInfo style={style} />;
    case "error":
      return <FaExclamationCircle style={style} />;
    case "warning":
      return <FaExclamationTriangle style={style} />;
    default:
      return <FaBug style={style} />;
  }
};

const AlertIcon = ({ className, type }) => (
  <div data-testid="modal-alert-type" className={className}>
    {displayIcon(type)}
  </div>
);

AlertIcon.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default styled(AlertIcon)`
  display: flex;
  align-items: flex-start;
  font-size: 15px;
  flex-shrink: 0;
  text-align: center;
  width: 30px;
  min-height: 100%;
  color: #fff;
  background-color: ${({ type }) => {
    switch (type) {
      case "error":
        return "#ff0000";
      case "info":
        return "#0075e0";
      case "warning":
        return "#f1c40f";
      case "success":
        return "#07bc0c";
      default:
        return "#000";
    }
  }};
`;
