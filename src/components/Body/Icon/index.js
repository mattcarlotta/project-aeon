/* istanbul ignore file */
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  FaUserCircle,
  FaLock,
  FaBug,
  FaEnvelope,
  FaKey,
  FaCalendarAlt,
  FaIdCard,
  FaIdBadge,
  FaHockeyPuck,
  FaStreetView,
  FaMinusCircle,
  FaTshirt,
  FaStickyNote,
  FaSearch,
  FaTimesCircle
} from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";

const icons = type => {
  switch (type) {
    case "calander": {
      return <FaCalendarAlt />;
    }
    case "erase": {
      return <FaTimesCircle />;
    }
    case "id": {
      return <FaIdCard />;
    }
    case "key": {
      return <FaKey />;
    }
    case "location": {
      return <FaStreetView />;
    }
    case "lock": {
      return <FaLock />;
    }
    case "mail": {
      return <FaEnvelope />;
    }
    case "note": {
      return <FaStickyNote />;
    }
    case "person": {
      return <MdPersonPin />;
    }
    case "puck": {
      return <FaHockeyPuck />;
    }
    case "remove": {
      return <FaMinusCircle />;
    }
    case "search": {
      return <FaSearch />;
    }
    case "tshirt": {
      return <FaTshirt />;
    }
    case "user": {
      return <FaUserCircle />;
    }
    case "usertag": {
      return <FaIdBadge />;
    }
    default: {
      return <FaBug />;
    }
  }
};

const Icon = ({ className, onClick, style, type }) => (
  <i
    role="button"
    className={className}
    onClick={onClick}
    style={style}
    tabIndex="0"
  >
    {icons(type)}
  </i>
);

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  type: PropTypes.string
};

export default styled(Icon)`
  display: flex;
  position: absolute;
  padding-left: 16px;
  transition: all 0.3s ease-in-out;
  z-index: 1;
  svg {
    color: ${({ color }) => color || "#d3dce6"};
    &:hover {
      color: ${({ onHoverColor }) => onHoverColor || "#d3dce6"};
    }
  }
  &:focus {
    outline: 0;
  }
`;
