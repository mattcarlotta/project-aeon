import React from "react";
import HomeContainer from "~components/Body/HomeContainer";
import LandingContainer from "~components/Body/LandingContainer";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";
import NextJSSKitLogo from "~images/nextjsKit.png";

const Home = () => (
	<HomeContainer>
		<Head title="Home" />
		<LandingContainer>
			<img src={NextJSSKitLogo} alt="ssrLogoLight.png" />
			<SubTitle>Edit files in the root directory and save to reload.</SubTitle>
		</LandingContainer>
	</HomeContainer>
);

export default Home;
