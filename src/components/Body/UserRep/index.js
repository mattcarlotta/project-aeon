/* istanbul ignore file */
import PropTypes from "prop-types";
import styled from "styled-components";
import round from "~utils/round";

const UserRep = ({ className, reputation }) => (
  <div className={className}>
    <span className="user-reputation">&#10026;</span>
    {round(reputation)} rep
  </div>
);

UserRep.propTypes = {
  className: PropTypes.string.isRequired,
  reputation: PropTypes.number.isRequired
};

export default styled(UserRep)`
  color: #1c1c1c;

  & .user-reputation {
    color: #ff0000;
    margin-right: 5px;
    font-size: 13px;
  }
`;
