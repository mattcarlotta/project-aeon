import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Popover } from "antd";
import { FaCogs } from "react-icons/fa";
import { signoutUser } from "~actions/Users";
import FlexEnd from "~components/Body/FlexEnd";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import Button from "~components/Body/Button";
import NavContainer from "~components/Navigation/NavContainer";
import LoadingNav from "~components/Navigation/LoadingNav";
import StyledLink from "~components/Navigation/StyledLink";

const Header = ({ isLoading, firstName, role, signoutUser }) => {
	const notLoggedin = !role || role === "guest";

	return (
		<NavContainer>
			<FlexEnd>
				{!isLoading ? (
					<List>
						<ListItem style={{ fontSize: 16 }}>
							Welcome, {notLoggedin ? role : firstName}!
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
								<Popover
									placement="bottomRight"
									content={
										<>
											<Button
												style={{ margin: "5px 0", display: "block" }}
												radius="4px"
												width="105px"
											>
												<StyledLink href="/help">Help</StyledLink>
											</Button>
											<Button
												style={{ margin: "5px 0", display: "block" }}
												radius="4px"
												width="105px"
											>
												<StyledLink href="/profile">Profile</StyledLink>
											</Button>
											<Button
												danger
												radius="4px"
												style={{ margin: "5px 0", display: "block" }}
												width="105px"
												onClick={signoutUser}
											>
												Sign Out
											</Button>
										</>
									}
									trigger="hover"
								>
									<Button radius="4px">
										<FaCogs style={{ position: "relative", top: 3 }} />
									</Button>
								</Popover>
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

Header.propTypes = {
	firstName: PropTypes.string,
	role: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	signoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({ ...users });

const mapDispatchToProps = {
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);