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
import QuestionContainer from "~components/Body/QuestionContainer";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import Voter from "~components/Body/Voter";
import Link from "~components/Navigation/Link";
import PostMeta from "~containers/Body/PostMeta";

class QuestionOverview extends Component {
  state = {
    ...this.props
  };

  handleUpdatedQuestion = data => this.setState({ ...data });

  render = () => {
    const { answered, body, id, uniquetitle, tags, title } = this.props;

    return (
      <Container
        answered={answered}
        hoverable
        cursor="pointer"
        maxWidth="750px"
        padding="0px"
        margin="0 auto 15px"
        onClick={() => Router.push("/q/[...slug]", `/q/${id}/${uniquetitle}`)}
      >
        <div css="padding-left: 45px;">
          <FlexCenter floating direction="column" height="120px" width="45px">
            <Voter {...this.state} handleChange={this.handleUpdatedQuestion} />
          </FlexCenter>
          <QuestionContainer>
            <div css="font-size: 12px;color: #787C7E;">
              <Flex>
                <FlexStart>
                  <PostMeta {...this.state} showViews />
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
  username: PropTypes.string.isRequired
};

export default QuestionOverview;
