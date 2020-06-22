import PropTypes from "prop-types";
import styled from "styled-components";
import { FaCheckCircle } from "react-icons/fa";

const CheckMark = ({ className }) => (
  <div data-testid="check-mark" className={className}>
    <FaCheckCircle style={{ color: "#28a745", fontSize: 14 }} />
  </div>
);

CheckMark.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(CheckMark)`
  margin-right: 4px;
`;
