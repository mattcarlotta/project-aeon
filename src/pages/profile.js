import React, { PureComponent } from "react";
import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import Head from "next/head";
import moment from "moment-timezone";
import { Col, Row, Tabs } from "antd";
import { connect } from "react-redux";
import { getProfile } from "~actions/Users";
import Center from "~components/Body/Center";
import Container from "~components/Body/Container";
import TabContainer from "~components/Body/TabContainer";
import RequireAuth from "~components/Containers/RequireAuth";
import DefaultAvatar from "~images/defaultAvatar.png";

const { TabPane } = Tabs;

class Profile extends PureComponent {
	static getInitialProps({ store, req, res }) {
		store.dispatch(getProfile({ req, res }));
	}

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
										css="height: 256px;width:256px; margin: 0 auto;border-radius: 50%;display:block;"
										src={settings.avatar || DefaultAvatar}
										alt="avatar.png"
									/>
									<div css="font-size: 28px;">
										{settings.firstname} {settings.lastname}
									</div>
									<div>({settings.email})</div>
									<div css="margin-top: 20px;">Role: {settings.role}</div>
									<div>
										Registered:{" "}
										{moment(settings.registered).format("MMMM Do, YYYY")}
									</div>
								</Center>
							</Container>
						</Col>
						<Col {...{ md: 24, lg: 17 }}>
							<Container>
								<Tabs defaultActiveKey="profile">
									<TabPane tab="Profile" key="profile">
										<TabContainer>Profile</TabContainer>
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
		role: PropTypes.string,
		email: PropTypes.string,
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		registered: PropTypes.string,
	}),
};

/* istanbul ignore next */
const mapStateToProps = ({ users }) => ({
	settings: users.settings,
});

export default connect(mapStateToProps)(Profile);
