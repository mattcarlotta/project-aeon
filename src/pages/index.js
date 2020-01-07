import React from "react";
import Head from "next/head";
import HomeContainer from "~components/Body/HomeContainer";
import LandingContainer from "~components/Body/LandingContainer";
import SubTitle from "~components/Body/SubTitle";
import NextJSSKitLogo from "~images/nextjsKit.png";

const Home = () => (
	<HomeContainer>
		<Head>
			<title>NextJS SSR Kit - Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<LandingContainer>
			<img src={NextJSSKitLogo} alt="ssrLogoLight.png" />
			<SubTitle>Edit files in the root directory and save to reload.</SubTitle>
		</LandingContainer>
	</HomeContainer>
);

export default Home;
