import React from "react";
import HomeContainer from "~components/Body/HomeContainer";
import LandingContainer from "~components/Body/LandingContainer";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";

const Home = () => (
	<HomeContainer>
		<Head title="Home" />
		<LandingContainer>
			<SubTitle>The best resource for everything.</SubTitle>
		</LandingContainer>
	</HomeContainer>
);

export default Home;
