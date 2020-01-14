import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import {
	FaCog,
	FaUserCog,
	FaSignOutAlt,
	FaQuestionCircle,
} from "react-icons/fa";
import { signoutUser } from "~actions/Users";
import FlexEnd from "~components/Body/FlexEnd";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import Button from "~components/Body/Button";
import NavContainer from "~components/Navigation/NavContainer";
import LoadingNav from "~components/Navigation/LoadingNav";
import StyledLink from "~components/Navigation/StyledLink";
import FlexMiddle from "~components/Body/FlexMiddle";

const DropDownButton = Dropdown.Button;
const MenuItem = Menu.Item;

const menuItemStyle = {
	margin: "5px 0",
	borderRadius: "4px",
	width: 200,
	lineHeight: "42px",
	padding: "0px 35px 0 15px",
};

const iconStyle = {
	marginRight: 15,
};

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
										<Menu style={{ border: "1px solid #dac2c2" }}>
											<MenuItem style={menuItemStyle}>
												<StyledLink
													style={{ margin: 0, padding: 0 }}
													href="/help"
												>
													<FlexMiddle>
														<FaQuestionCircle style={iconStyle} /> Help
													</FlexMiddle>
												</StyledLink>
											</MenuItem>
											<MenuItem style={menuItemStyle}>
												<StyledLink
													style={{ margin: 0, padding: 0 }}
													href="/profile"
												>
													<FlexMiddle>
														<FaUserCog style={iconStyle} /> Profile
													</FlexMiddle>
												</StyledLink>
											</MenuItem>
											<MenuItem style={{ ...menuItemStyle, margin: 0 }}>
												<div
													role="button"
													css="width: 100%; font-size: 16px;"
													onClick={signoutUser}
												>
													<FlexMiddle>
														<FaSignOutAlt style={iconStyle} /> Sign Out
													</FlexMiddle>
												</div>
											</MenuItem>
										</Menu>
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
