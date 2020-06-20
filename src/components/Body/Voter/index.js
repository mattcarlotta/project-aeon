import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "~components/Body/Button";
import Votes from "~components/Body/Votes";
import roundVotes from "~utils/roundVotes";

const Voter = ({ downvoted, handleRemoveVote, handleVote, upvoted, votes }) => {
  return (
    <>
      <Button
        upvote
        height="30px"
        width="30px"
        padding="0px"
        radius="4px"
        upvoted={upvoted}
        onClick={!upvoted ? () => handleVote("upvote") : handleRemoveVote}
      >
        <FaChevronUp style={{ position: "relative", top: 1 }} />
      </Button>
      <Votes dataVotes={votes} votes={roundVotes(votes)} />
      <Button
        downvote
        height="30px"
        width="30px"
        padding="0px"
        radius="4px"
        downvoted={downvoted}
        onClick={!downvoted ? () => handleVote("downvote") : handleRemoveVote}
      >
        <FaChevronDown style={{ position: "relative", top: 3 }} />
      </Button>
    </>
  );
};

Voter.propTypes = {
  downvoted: PropTypes.bool.isRequired,
  handleRemoveVote: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
  upvoted: PropTypes.bool.isRequired,
  votes: PropTypes.number.isRequired,
};

export default Voter;
