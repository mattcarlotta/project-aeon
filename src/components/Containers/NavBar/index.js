import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authenticateUser, signoutUser } from "~actions/Users";
import Flex from "~components/Body/Flex";
import FlexEnd from "~components/Body/FlexEnd";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import StyledLink from "~components/Body/StyledLink";
import LoadingNav from "~components/Body/LoadingNav";

class NavBar extends Component {
	componentDidMount() {
		this.props.authenticateUser();
	}

	render = () => {
		const { isLoading, firstName, role, signoutUser } = this.props;
		const notLoggedin = !role || role === "guest";

		return (
			<Flex style={{ width: "100%", background: "#fff", height: 50 }}>
				<FlexEnd>
					{!isLoading ? (
						<List>
							<ListItem>Welcome, {notLoggedin ? "guest" : firstName}!</ListItem>
							{notLoggedin ? (
								<>
									<ListItem>
										<StyledLink href="/login">Sign In</StyledLink>
									</ListItem>
									<ListItem>
										<StyledLink href="/register">Register</StyledLink>
									</ListItem>
								</>
							) : (
								<ListItem>
									<button type="button" onClick={signoutUser}>
										Sign Out
									</button>
								</ListItem>
							)}
						</List>
					) : (
						<LoadingNav />
					)}
				</FlexEnd>
			</Flex>
		);
	};
}

NavBar.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	firstName: PropTypes.string,
	role: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	signoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({ ...users });

const mapDispatchToProps = {
	authenticateUser,
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
