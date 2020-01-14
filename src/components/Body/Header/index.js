import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown } from "antd";
import { FaCog } from "react-icons/fa";
import { signoutUser } from "~actions/Users";
import FlexEnd from "~components/Body/FlexEnd";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import Button from "~components/Body/Button";
import NavContainer from "~components/Navigation/NavContainer";
import LoadingNav from "~components/Navigation/LoadingNav";
import StyledLink from "~components/Navigation/StyledLink";

const DropDownButton = Dropdown.Button;

const Header = ({ isLoading, firstName, lastName, role, signoutUser }) => {
	const notLoggedin = !role || role === "guest";

	return (
		<NavContainer>
			<FlexEnd>
				{!isLoading ? (
					<List>
						{notLoggedin ? (
							<>
								<ListItem style={{ fontSize: 16 }}>Welcome, guest!</ListItem>
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
								<DropDownButton
									placement="bottomRight"
									overlay={
										<div css="background: #fff;padding: 4px 12px;width: 200px;box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);border-radius:4px;">
											<Button
												style={{ margin: "5px 0", display: "block" }}
												radius="4px"
												padding="0px"
											>
												<StyledLink style={{ padding: "4px 8px" }} href="/help">
													Help
												</StyledLink>
											</Button>
											<Button
												style={{ margin: "5px 0", display: "block" }}
												radius="4px"
												padding="0px"
											>
												<StyledLink
													style={{ padding: "4px 8px" }}
													href="/profile"
												>
													Profile
												</StyledLink>
											</Button>
											<Button
												danger
												radius="4px"
												style={{ margin: "5px 0", display: "block" }}
												onClick={signoutUser}
											>
												Sign Out
											</Button>
										</div>
									}
									size="large"
									icon={<FaCog style={{ position: "relative", top: 3 }} />}
									trigger={["click"]}
								>
									{firstName}&nbsp;
									{lastName}
								</DropDownButton>
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
	lastName: PropTypes.string,
	role: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	signoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({ ...users });

const mapDispatchToProps = {
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
