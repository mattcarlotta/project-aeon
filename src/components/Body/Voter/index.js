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
    return (
      <>
        <Button
          upvote
          overlay={alignHorizontal}
          height={!alignHorizontal ? "25px" : "100%"}
          width={!alignHorizontal ? "25px" : "20px"}
          padding="0px"
          radius={!alignHorizontal ? "4px" : "0"}
          upvoted={upvoted}
          onClick={!upvoted ? this.handleUpClick : this.handleRemoveClick}
        >
          <FaArrowCircleUp
            style={
              !alignHorizontal
                ? { position: "relative", top: 1 }
                : { fontSize: 13, position: "relative", top: 1 }
            }
          />
        </Button>
        <Votes
          dataVotes={votes}
          votes={roundVotes(votes)}
          style={
            !alignHorizontal
              ? {}
              : {
                  padding: "0 8px",
                  fontSize: 15,
                  minWidth: 40,
                  fontWeight: "normal",
                }
          }
        />
        <Button
          downvote
          overlay={alignHorizontal}
          height={!alignHorizontal ? "25px" : "100%"}
          width={!alignHorizontal ? "25px" : "20px"}
          padding="0px"
          radius={!alignHorizontal ? "4px" : "0"}
          downvoted={downvoted}
          onClick={!downvoted ? this.handleDownClick : this.handleRemoveClick}
        >
          <FaArrowCircleDown
            style={
              !alignHorizontal
                ? { position: "relative", top: 3 }
                : { fontSize: 13, position: "relative", top: 1 }
            }
          />
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
  updateQuestion: PropTypes.func.isRequired,
};

Voter.defaultProps = {
  align: "vertical",
};

export default Voter;
