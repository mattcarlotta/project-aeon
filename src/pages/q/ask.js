import Head from "~components/Navigation/Head";
import Col from "~components/Body/Col";
import Container from "~components/Body/Container";
import PageTitle from "~components/Body/PageTitle";
import Row from "~components/Body/Row";
import QuestionForm from "~containers/Forms/QuestionForm";
import withAuthentication from "~containers/App/withAuthentication";
import { wrapper } from "~store";

const AskQuestion = () => (
  <>
    <Head title="Ask Question" url="q/ask" />
    <PageTitle>Ask Question</PageTitle>
    <Row padding="0 10px">
      <Col md={24} lg={15}>
        <Container style={{ padding: 20 }}>
          <QuestionForm />
        </Container>
      </Col>
      <Col md={24} lg={9}>
        <Container style={{ padding: 20 }}>Tips</Container>
      </Col>
    </Row>
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(async ctx => ({
  props: {
    ...(await withAuthentication.getServerSideProps(ctx))
  }
}));

export default withAuthentication(AskQuestion);
