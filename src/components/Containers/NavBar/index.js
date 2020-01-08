import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authenticateUser, signoutUser } from "~actions/Users";
import FlexEnd from "~components/Body/FlexEnd";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import Button from "~components/Body/Button";
import NavContainer from "~components/Navigation/NavContainer";
import LoadingNav from "~components/Navigation/LoadingNav";
import StyledLink from "~components/Navigation/StyledLink";

class NavBar extends Component {
	componentDidMount() {
		this.props.authenticateUser();
	}

	render = () => {
		const { isLoading, firstName, role, signoutUser } = this.props;
		const notLoggedin = !role || role === "guest";

		return (
			<NavContainer>
				<FlexEnd>
					{!isLoading ? (
						<List>
							<ListItem style={{ fontSize: 16 }}>
								Welcome, {notLoggedin ? "guest" : firstName}!
							</ListItem>
							{notLoggedin ? (
								<>
									<ListItem>
										<StyledLink href="/signin">
											<Button radius="4px" type="button">
												Sign In
											</Button>
										</StyledLink>
									</ListItem>
									<ListItem>
										<StyledLink href="/register">
											<Button primary radius="4px" type="button">
												Register
											</Button>
										</StyledLink>
									</ListItem>
								</>
							) : (
								<ListItem>
									<Button
										danger
										radius="4px"
										type="button"
										onClick={signoutUser}
									>
										Sign Out
									</Button>
								</ListItem>
							)}
						</List>
					) : (
						<LoadingNav />
					)}
				</FlexEnd>
			</NavContainer>
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
