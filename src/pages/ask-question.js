import React from "react";
import { Col, Row } from "antd";
import Head from "~components/Navigation/Head";
import Container from "~components/Body/Container";
import QuestionForm from "~containers/Forms/QuestionForm";
import withAuthentication from "~containers/App/withAuthentication";

const AskQuestion = () => (
	<>
		<Head title="Ask Question" />
		<h1>Ask Question</h1>
		<Row gutter={20}>
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

export default withAuthentication(AskQuestion);
