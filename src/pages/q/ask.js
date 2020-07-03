import Router from "next/router";
import Head from "~components/Navigation/Head";
import Col from "~components/Body/Col";
import Container from "~components/Body/Container";
import PageTitle from "~components/Body/PageTitle";
import Row from "~components/Body/Row";
import QuestionForm from "~containers/Forms/QuestionForm";
import withAuthentication from "~containers/App/withAuthentication";

const AskQuestion = () => (
  <>
    <Head title="Ask Question" url="q/ask" />
    <PageTitle>Ask Question</PageTitle>
    <Row padding="0 10px">
      <Col md={24} lg={15}>
        <Container style={{ padding: 20 }}>
          <QuestionForm
            alertType="success"
            cancelQuestion={() => Router.push("/")}
            URL="q/create"
          />
        </Container>
      </Col>
      <Col md={24} lg={9}>
        <Container style={{ padding: 20 }}>Tips</Container>
      </Col>
    </Row>
  </>
);

export default withAuthentication(AskQuestion);
