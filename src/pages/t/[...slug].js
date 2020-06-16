import { PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import { connect } from "react-redux";
import { resetMessages, setError } from "~actions/Messages";
import Container from "~components/Body/Container";
import MaskPreview from "~components/Body/MaskPreview";
import QuestionDetails from "~components/Body/QuestionDetails";
import QuestionTitle from "~components/Body/QuestionTitle";
import StopPropagation from "~components/Body/StopPropagation";
import Tag from "~components/Body/Tag";
import toast from "~components/Body/Toast";
import Tooltip from "~components/Body/Tooltip";
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
              hoverable
              key={question.key}
              centered
              maxWidth="750px"
              padding="20px"
              style={{ cursor: "pointer" }}
              onClick={() =>
                Router.push(
                  "/q/[...slug]",
                  `/q/${question.key}/${question.uniquetitle}`,
                )
              }
            >
              <div css="font-size: 12px;color: #787C7E;">
                <QuestionDetails>
                  Posted by&nbsp;
                  <StopPropagation>
                    <Link
                      blue
                      nomargin
                      href="/u/[...slug]"
                      asHref={`/u/${question.key}/${question.username}`}
                    >
                      {question.username}
                    </Link>
                  </StopPropagation>
                </QuestionDetails>
                <Tooltip
                  title={dayjs(question.date).format("MMMM Do, YYYY @ HH:MMa")}
                >
                  <QuestionDetails>
                    {dayjs(question.date).fromNow()}
                  </QuestionDetails>
                </Tooltip>
                <QuestionDetails>|</QuestionDetails>
                <QuestionDetails>views: {question.views}</QuestionDetails>
              </div>
              <div css="padding: 0 10px;">
                <QuestionTitle>{question.title}</QuestionTitle>
                <div css="margin-bottom: 15px;">
                  {question.tags.map(tag => (
                    <StopPropagation key={tag}>
                      <Link
                        margin="0 5px 0 0"
                        href="/t/[...slug]"
                        asHref={`/t/${tag}`}
                      >
                        <Tag>{tag}</Tag>
                      </Link>
                    </StopPropagation>
                  ))}
                </div>
                <MaskPreview>{question.body}</MaskPreview>
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
    let data = {};
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
