import React from "react";
import LandingContainer from "~components/Body/LandingContainer";
import Button from "~components/Body/Button";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const Home = () => (
	<div css="text-align: center;">
		<Head title="Home" />
		<LandingContainer>
			<SubTitle>The best resource for everything.</SubTitle>
			<Link href="/ask-question">
				<Button width={200} style={{ margin: "0 auto" }} onClick={null}>
					Ask A Question
				</Button>
			</Link>
		</LandingContainer>
	</div>
);

export default Home;
