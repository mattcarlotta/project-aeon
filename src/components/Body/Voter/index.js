import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "~components/Body/Button";
import Votes from "~components/Body/Votes";
import roundVotes from "~utils/roundVotes";

const Voter = ({ downVote, upVote, tertiary, votes }) => (
  <>
    <Button
      onClick={upVote}
      plain={!tertiary}
      tertiary={tertiary}
      height="30px"
      width="30px"
      padding="0px"
      radius="4px"
    >
      <FaChevronUp style={{ position: "relative", top: 1 }} />
    </Button>
    <Votes votes={roundVotes(votes)} />
    <Button
      onClick={downVote}
      plain={!tertiary}
      tertiary={tertiary}
      height="30px"
      width="30px"
      padding="0px"
      radius="4px"
    >
      <FaChevronDown style={{ position: "relative", top: 3 }} />
    </Button>
  </>
);

Voter.propTypes = {
  downVote: PropTypes.func.isRequired,
  tertiary: PropTypes.bool,
  upVote: PropTypes.func.isRequired,
  votes: PropTypes.number,
};

Voter.defaultProps = {
  tertiary: false,
};

export default Voter;
