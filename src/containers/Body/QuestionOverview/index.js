import { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import Container from "~components/Body/Container";
import CheckMark from "~components/Body/CheckMark";
import Flex from "~components/Body/Flex";
import FlexCenter from "~components/Body/FlexCenter";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";
import MaskPreview from "~components/Body/MaskPreview";
import NoSSR from "~components/Body/NoSSR";
import QuestionContainer from "~components/Body/QuestionContainer";
import QuestionDetails from "~components/Body/QuestionDetails";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import toast from "~components/Body/Toast";
import Tooltip from "~components/Body/Tooltip";
import Voter from "~components/Body/Voter";
import Link from "~components/Navigation/Link";
import app from "~utils/axiosConfig";
import dayjs from "~utils/dayjs";
import { parseData } from "~utils/parseResponse";
import roundViews from "~utils/round";

class QuestionOverview extends Component {
  state = {
    ...this.props,
  };

  handleVote = async type => {
    try {
      const res = await app.post(`q/${type}/${this.props.questionKey}`);
      const data = parseData(res);

      this.setState({ ...data });
    } catch (error) {
      toast({ type: "error", message: error.toString() });
    }
  };

  render = () => {
    const {
      answered,
      body,
      date,
      questionKey,
      uniquetitle,
      userkey,
      username,
      tags,
      title,
      views,
    } = this.props;

    return (
      <Container
        answered={answered}
        centered
        hoverable
        cursor="pointer"
        maxWidth="750px"
        padding="0px"
        onClick={() =>
          Router.push("/q/[...slug]", `/q/${questionKey}/${uniquetitle}`)
        }
      >
        <div css="padding-left: 45px;">
          <FlexCenter
            direction="column"
            height="110px"
            width="45px"
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              paddingLeft: "7px",
            }}
          >
            <Voter
              {...this.state}
              handleRemoveVote={this.handleRemoveVote}
              handleVote={this.handleVote}
            />
          </FlexCenter>
          <QuestionContainer>
            <div css="font-size: 12px;color: #787C7E;">
              <Flex>
                <FlexStart>
                  <QuestionDetails>
                    Posted by&nbsp;
                    <Link
                      blue
                      nomargin
                      stopPropagation
                      href="/u/[...slug]"
                      asHref={`/u/${userkey}/${username}`}
                    >
                      {username}
                    </Link>
                  </QuestionDetails>
                  <NoSSR>
                    <Tooltip
                      title={dayjs(date).format("MMMM Do, YYYY @ HH:MMa")}
                    >
                      <QuestionDetails>{dayjs(date).fromNow()}</QuestionDetails>
                    </Tooltip>
                  </NoSSR>
                  <QuestionDetails>|</QuestionDetails>
                  <QuestionDetails>views: {roundViews(views)}</QuestionDetails>
                </FlexStart>
                {answered && (
                  <FlexEnd>
                    <CheckMark />
                  </FlexEnd>
                )}
              </Flex>
            </div>
            <QuestionTitle>{title}</QuestionTitle>
            <div css="margin-bottom: 15px;">
              {tags.map(tag => (
                <Link
                  key={tag}
                  stopPropagation
                  margin="0 5px 0 0"
                  href="/t/[...slug]"
                  asHref={`/t/${tag}`}
                >
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
            <MaskPreview>{body}</MaskPreview>
          </QuestionContainer>
        </div>
      </Container>
    );
  };
}

QuestionOverview.propTypes = {
  answered: PropTypes.bool,
  body: PropTypes.string,
  date: PropTypes.string,
  downvoters: PropTypes.arrayOf(PropTypes.string),
  questionKey: PropTypes.number.isRequired,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  views: PropTypes.number,
  uniquetitle: PropTypes.string,
  upvoters: PropTypes.arrayOf(PropTypes.string),
  userkey: PropTypes.number,
  username: PropTypes.string,
};

export default QuestionOverview;
