import { PureComponent } from "react";
import PropTypes from "prop-types";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import Button from "~components/Body/Button";
import Votes from "~components/Body/Votes";
import roundVotes from "~utils/round";

class Voter extends PureComponent {
  handleUpClick = () => this.props.handleVote("upvote");

  handleDownClick = () => this.props.handleVote("downvote");

  handleRemoveClick = () => this.props.handleVote("remove-vote");

  render = () => {
    const { downvoted, upvoted, votes } = this.props;
    return (
      <>
        <Button
          upvote
          height="25px"
          width="25px"
          padding="0px"
          radius="4px"
          upvoted={upvoted}
          onClick={!upvoted ? this.handleUpClick : this.handleRemoveClick}
        >
          <FaArrowCircleUp style={{ position: "relative", top: 1 }} />
        </Button>
        <Votes dataVotes={votes} votes={roundVotes(votes)} />
        <Button
          downvote
          height="25px"
          width="25px"
          padding="0px"
          radius="4px"
          downvoted={downvoted}
          onClick={!downvoted ? this.handleDownClick : this.handleRemoveClick}
        >
          <FaArrowCircleDown style={{ position: "relative", top: 3 }} />
        </Button>
      </>
    );
  };
}

Voter.propTypes = {
  downvoted: PropTypes.bool,
  handleVote: PropTypes.func.isRequired,
  upvoted: PropTypes.bool,
  votes: PropTypes.number.isRequired,
};

export default Voter;
