import React from "react";
import { Col, Row } from "antd";
import Head from "~components/Navigation/Head";
import Container from "~components/Body/Container";
import PageContainer from "~components/Body/PageContainer";
import QuestionForm from "~containers/Forms/QuestionForm";

const AskQuestion = () => (
	<PageContainer>
		<Head title="Ask Question" />
		<h1>Ask Question</h1>
		<Row gutter={20}>
			<Col md={24} lg={14}>
				<Container style={{ padding: 20 }}>
					<QuestionForm />
				</Container>
			</Col>
			<Col md={24} lg={8}>
				<Container style={{ padding: 20 }}>Tips</Container>
			</Col>
		</Row>
	</PageContainer>
);

export default AskQuestion;
