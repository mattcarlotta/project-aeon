import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import Head from "next/head";
import moment from "moment-timezone";
import { Col, Row, Tabs } from "antd";
import { connect } from "react-redux";
import { getProfile } from "~actions/Users";
import ProfileTab from "~components/Body/Profile";
import Center from "~components/Body/Center";
import Container from "~components/Body/Container";
import TabContainer from "~components/Body/TabContainer";
import Title from "~components/Body/Title";
import SubTitle from "~components/Body/SubTitle";
import RequireAuth from "~components/Containers/RequireAuth";
import DefaultAvatar from "~images/defaultAvatar.png";

const { TabPane } = Tabs;

class Profile extends Component {
	static getInitialProps({ store, req, res }) {
		store.dispatch(getProfile({ req, res }));
	}

	state = {
		showDescriptionForm: false,
	};

	toggleDescriptionForm = () =>
		this.setState(prevState => ({
			showDescriptionForm: !prevState.showDescriptionForm,
		}));

	render = () => {
		const { settings } = this.props;

		return (
			<RequireAuth>
				<Head>
					<title>NextJS SSR Kit - Profile</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{!isEmpty(settings) ? (
					<Row gutter={10}>
						<Col {...{ md: 24, lg: 7 }}>
							<Container>
								<Center>
									<img
										css="height: 200px;width:200px; margin: 0 auto;border-radius: 50%;display:block;"
										src={settings.avatar || DefaultAvatar}
										alt="avatar.png"
									/>
									<Title
										style={{ margin: "15px 0", fontSize: 28, color: "#0f7ae5" }}
									>
										<span>
											{settings.displayname
												? settings.displayname
												: `${settings.firstname} ${settings.lastname}`}
										</span>
									</Title>
									<Title style={{ marginTop: 10 }}>Role</Title>
									<SubTitle>{settings.role}</SubTitle>
									<Title>Registered</Title>
									<SubTitle>
										{moment(settings.registered).format("MMMM Do, YYYY")}
									</SubTitle>
									<Title>Reputation</Title>
									<SubTitle>{settings.reputation}</SubTitle>
								</Center>
							</Container>
						</Col>
						<Col {...{ md: 24, lg: 17 }}>
							<Container>
								<Tabs defaultActiveKey="profile">
									<TabPane tab="Profile" key="profile">
										<ProfileTab
											{...settings}
											showDescriptionForm={this.state.showDescriptionForm}
											toggleDescriptionForm={this.toggleDescriptionForm}
										/>
									</TabPane>
									<TabPane tab="Activity" key="activity">
										<TabContainer>Activity</TabContainer>
									</TabPane>
									<TabPane tab="Edit Settings" key="edit-settings">
										<TabContainer>Edit Settings</TabContainer>
									</TabPane>
								</Tabs>
							</Container>
						</Col>
					</Row>
				) : (
					<p>Loading...</p>
				)}
			</RequireAuth>
		);
	};
}

Profile.propTypes = {
	settings: PropTypes.shape({
		id: PropTypes.string,
		avatar: PropTypes.string,
		description: PropTypes.string,
		displayname: PropTypes.string,
		role: PropTypes.string,
		email: PropTypes.string,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		registered: PropTypes.string,
		reputation: PropTypes.string,
		website: PropTypes.string,
	}),
};

/* istanbul ignore next */
const mapStateToProps = ({ users }) => ({
	settings: users.settings,
});

export default connect(mapStateToProps)(Profile);
