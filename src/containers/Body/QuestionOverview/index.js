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
import Tooltip from "~components/Body/Tooltip";
import Voter from "~components/Body/Voter";
import Link from "~components/Navigation/Link";
import dayjs from "~utils/dayjs";
import roundViews from "~utils/round";

class QuestionOverview extends Component {
  state = {
    ...this.props,
  };

  handleUpdatedQuestion = data => this.setState({ ...data });

  render = () => {
    const {
      answered,
      body,
      date,
      id,
      uniquetitle,
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
        onClick={() => Router.push("/q/[...slug]", `/q/${id}/${uniquetitle}`)}
      >
        <div css="padding-left: 45px;">
          <FlexCenter
            direction="column"
            height="120px"
            width="45px"
            style={{
              top: 0,
              left: 0,
              position: "absolute",
            }}
          >
            <Voter
              {...this.state}
              updateQuestion={this.handleUpdatedQuestion}
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
                      asHref={`/u/${username}`}
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
  body: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  downvoters: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  views: PropTypes.number,
  uniquetitle: PropTypes.string.isRequired,
  upvoters: PropTypes.arrayOf(PropTypes.string),
  username: PropTypes.string.isRequired,
};

export default QuestionOverview;
