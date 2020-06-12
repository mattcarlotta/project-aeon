import isEmpty from "lodash.isempty";
import PropTypes from "prop-types";
import { resetMessages } from "~actions/Messages";
import Container from "~components/Body/Container";
import Head from "~components/Navigation/Head";
import Spinner from "~components/Body/Spinner";
import { wrapper } from "~store";
import app from "~utils/axiosConfig";
import { parseData } from "~utils/parseResponse";
import withServerMessages from "~containers/App/withServerMessages";
import Affix from "~components/Body/Affix";

const UserQuestion = ({ data, isLoading, title }) => (
  <>
    <Head title={title} />
    {isLoading ? (
      <Spinner />
    ) : isEmpty(data) ? (
      <div>No Questions</div>
    ) : (
      <Container centered maxWidth="750px">
        <Affix>
          <h3 css="margin-left: 20px;">{data.title}</h3>
        </Affix>

        <pre css="white-space: break-spaces;">
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre>
      </Container>
    )}
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store: { dispatch }, query }) => {
    let data = { title: "Not found" };
    let serverError = "";
    try {
      dispatch(resetMessages());
      const res = await app.get(`questions/${query.slug[0]}`);
      data = parseData(res);
    } catch (e) {
      serverError = e.toString();
    }

    return {
      props: {
        data,
        isLoading: false,
        serverError,
        title: `Questions - ${data.title}`,
      },
    };
  },
);

UserQuestion.propTypes = {
  data: PropTypes.shape({
    key: PropTypes.number,
    userid: PropTypes.string,
    date: PropTypes.string,
    answered: PropTypes.bool,
    views: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        userid: PropTypes.string,
        comment: PropTypes.string,
        accepted: PropTypes.bool,
        points: PropTypes.number,
      }),
    ),
  }),
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default withServerMessages(UserQuestion);
