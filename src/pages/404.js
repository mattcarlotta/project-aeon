import React from "react";
import FlexCenter from "~components/Body/FlexCenter";
import HomeIcon from "~components/Body/HomeIcon";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import SubTitle from "~components/Body/SubTitle";
import Title from "~components/Body/Title";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const NotFound = () => (
	<FlexCenter>
		<Head title="Not Found" />
		<Center style={{ color: "#03a9f3", padding: "100px" }}>
			<Title style={{ color: "#03a9f3", fontSize: "120px" }}>404</Title>
			<Title style={{ color: "#03a9f3", marginTop: "-20px" }}>
				Page Not Found.
			</Title>
			<SubTitle>
				Uh oh, you took a wrong turn! Unable to locate that page.
			</SubTitle>
			<Link href="/">
				<Button radius="4px" type="button">
					<HomeIcon />
					<span css="margin-left: 5px;">Go Home</span>
				</Button>
			</Link>
		</Center>
	</FlexCenter>
);

export default NotFound;
