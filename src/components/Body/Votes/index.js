import PropTypes from "prop-types";
import styled from "styled-components";

const Votes = ({ className, votes }) => (
  <div data-votes={votes} className={className}>
    {votes}
  </div>
);

Votes.propTypes = {
  className: PropTypes.string.isRequired,
  votes: PropTypes.string,
};

export default styled(Votes)`
  font-weight: bold;
  font-size: ${({ votes }) => (votes.length <= 5 ? "15px" : "12px")};
  line-height: 20px;
  min-width: 20px;
  text-align: center;
`;
