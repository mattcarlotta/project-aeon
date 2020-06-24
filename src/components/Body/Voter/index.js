import { PureComponent } from "react";
import PropTypes from "prop-types";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import Button from "~components/Body/Button";
import toast from "~components/Body/Toast";
import Votes from "~components/Body/Votes";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parse";
import roundVotes from "~utils/round";

class Voter extends PureComponent {
  handleVote = async type => {
    try {
      const res = await app.post(`q/${type}/${this.props.id}`);
      const data = parseData(res);

      this.props.updateQuestion(data);
    } catch (error) {
      toast({ type: "error", message: error.toString() });
    }
  };

  handleUpClick = () => this.handleVote("upvote");

  handleDownClick = () => this.handleVote("downvote");

  handleRemoveClick = () => this.handleVote("remove-vote");

  render = () => {
    const { align, downvoted, upvoted, votes } = this.props;
    const alignHorizontal = align !== "vertical";
    const btnProps = {
      overlay: alignHorizontal,
      height: !alignHorizontal ? "30px" : "100%",
      width: !alignHorizontal ? "30px" : "20px",
      radius: !alignHorizontal ? "4px" : "0",
      padding: "0px"
    };
    const offsetSize = !alignHorizontal ? 1 : 0;
    const iconStyle = {
      fontSize: 13 + offsetSize,
      position: "relative",
      top: 1
    };

    return (
      <>
        <Button
          {...btnProps}
          upvote
          upvoted={upvoted}
          onClick={!upvoted ? this.handleUpClick : this.handleRemoveClick}
        >
          <FaArrowCircleUp style={iconStyle} />
        </Button>
        <Votes
          alignHorizontal={alignHorizontal}
          dataVotes={votes}
          votes={roundVotes(votes)}
        />
        <Button
          {...btnProps}
          downvote
          downvoted={downvoted}
          onClick={!downvoted ? this.handleDownClick : this.handleRemoveClick}
        >
          <FaArrowCircleDown style={iconStyle} />
        </Button>
      </>
    );
  };
}

Voter.propTypes = {
  align: PropTypes.string,
  downvoted: PropTypes.bool,
  id: PropTypes.number.isRequired,
  upvoted: PropTypes.bool,
  votes: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired
};

Voter.defaultProps = {
  align: "vertical"
};

export default Voter;
