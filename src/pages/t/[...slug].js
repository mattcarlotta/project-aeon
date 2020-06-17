import { PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import { connect } from "react-redux";
import { resetMessages, setError } from "~actions/Messages";
import Container from "~components/Body/Container";
import CheckMark from "~components/Body/CheckMark";
import Flex from "~components/Body/Flex";
import FlexCenter from "~components/Body/FlexCenter";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";
import MaskPreview from "~components/Body/MaskPreview";
import QuestionContainer from "~components/Body/QuestionContainer";
import QuestionDetails from "~components/Body/QuestionDetails";
import QuestionTitle from "~components/Body/QuestionTitle";
import Tag from "~components/Body/Tag";
import toast from "~components/Body/Toast";
import Tooltip from "~components/Body/Tooltip";
import Voter from "~components/Body/Voter";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import { parseData } from "~utils/parseResponse";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";
import dayjs from "~utils/dayjs";

class TagQuestions extends PureComponent {
  componentDidMount() {
    const { setError, serverError } = this.props;
    if (serverError) {
      setError(serverError);
      toast({ type: "error", message: serverError });
    }
  }

  render = () => {
    const { data, title } = this.props;

    return (
      <>
        <Head
          title={`${title ? `Newest '${title}' Questions` : "Not Found"}`}
        />
        {isEmpty(data) ? (
          <div>No Tagged Questions Found</div>
        ) : (
          data.map(question => (
            <Container
              key={question.key}
              answered={question.answered}
              centered
              hoverable
              maxWidth="750px"
              padding="0px"
              style={{ cursor: "pointer" }}
              onClick={() =>
                Router.push(
                  "/q/[...slug]",
                  `/q/${question.key}/${question.uniquetitle}`,
                )
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
                    downVote={() => {}}
                    upVote={() => {}}
                    votes={question.votes}
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
                            asHref={`/u/${question.key}/${question.username}`}
                          >
                            {question.username}
                          </Link>
                        </QuestionDetails>
                        <Tooltip
                          title={dayjs(question.date).format(
                            "MMMM Do, YYYY @ HH:MMa",
                          )}
                        >
                          <QuestionDetails>
                            {dayjs(question.date).fromNow()}
                          </QuestionDetails>
                        </Tooltip>
                        <QuestionDetails>|</QuestionDetails>
                        <QuestionDetails>
                          views: {question.views}
                        </QuestionDetails>
                      </FlexStart>
                      {question.answered && (
                        <FlexEnd>
                          <CheckMark />
                        </FlexEnd>
                      )}
                    </Flex>
                  </div>
                  <QuestionTitle>{question.title}</QuestionTitle>
                  <div css="margin-bottom: 15px;">
                    {question.tags.map(tag => (
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
                  <MaskPreview>{question.body}</MaskPreview>
                </QuestionContainer>
              </div>
            </Container>
          ))
        )}
      </>
    );
  };
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store: { dispatch }, query }) => {
    let data = [];
    let title = "";
    let serverError = "";
    try {
      const { 0: key } = query.slug;
      dispatch(resetMessages());
      const res = await app.get(`t/${key}`);
      data = parseData(res);
      title = key;
    } catch (e) {
      serverError = e.toString();
    }

    return {
      props: {
        data,
        serverError,
        title,
      },
    };
  },
);

TagQuestions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      answered: PropTypes.bool,
      body: PropTypes.string,
      comments: PropTypes.number,
      date: PropTypes.string,
      id: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      views: PropTypes.number,
      userid: PropTypes.string,
    }),
  ),
  title: PropTypes.string.isRequired,
  serverError: PropTypes.string,
  setError: PropTypes.func.isRequired,
};

export default connect(null, { setError })(TagQuestions);
