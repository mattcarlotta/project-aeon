import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "~components/Body/Button";
import Votes from "~components/Body/Votes";
import roundVotes from "~utils/roundVotes";

const Voter = ({ downVote, upVote, votes }) => (
  <>
    <Button
      plain
      height="30px"
      width="30px"
      padding="0px"
      radius="4px"
      onClick={upVote}
    >
      <FaChevronUp style={{ position: "relative", top: 1 }} />
    </Button>
    <Votes dataVotes={votes} votes={roundVotes(votes)} />
    <Button
      plain
      height="30px"
      width="30px"
      padding="0px"
      radius="4px"
      onClick={downVote}
    >
      <FaChevronDown style={{ position: "relative", top: 3 }} />
    </Button>
  </>
);

Voter.propTypes = {
  downVote: PropTypes.func.isRequired,
  upVote: PropTypes.func.isRequired,
  votes: PropTypes.number,
};

export default Voter;
