import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { authenticateUser } from "~actions/Users";
import Flex from "~components/Body/Flex";
import FlexEnd from "~components/Body/FlexEnd";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import StyledLink from "~components/Body/StyledLink";

class NavBar extends Component {
	componentDidMount() {
		this.props.authenticateUser();
	}

	render = () => {
		const { role, firstName } = this.props;
		const notLoggedin = !role || role === "guest";

		return (
			<Flex style={{ width: "100%", background: "#fff" }}>
				<FlexEnd>
					<List>
						<ListItem>Welcome, {notLoggedin ? "guest" : firstName}!</ListItem>
						{notLoggedin && (
							<>
								<ListItem>
									<StyledLink href="/login">Sign In</StyledLink>
								</ListItem>
								<ListItem>
									<StyledLink href="/signup">Sign Up</StyledLink>
								</ListItem>
							</>
						)}
					</List>
				</FlexEnd>
			</Flex>
		);
	};
}

NavBar.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	firstName: PropTypes.string,
	role: PropTypes.string,
};

const mapStateToProps = ({ users }) => ({ ...users });

const mapDispatchToProps = {
	authenticateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
