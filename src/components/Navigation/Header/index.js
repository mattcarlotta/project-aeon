import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown, Menu } from "antd";
import {
	FaCog,
	FaUserCog,
	FaSignOutAlt,
	FaQuestionCircle,
	FaUserCircle,
} from "react-icons/fa";
import { signoutUser } from "~actions/Users";
import FlexEnd from "~components/Body/FlexEnd";
import Flex from "~components/Body/Flex";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import Button from "~components/Body/Button";
import NavContainer from "~components/Navigation/NavContainer";
import LoadingNav from "~components/Navigation/LoadingNav";
import StyledLink from "~components/Navigation/StyledLink";
import FlexMiddle from "~components/Body/FlexMiddle";
import TextAlign from "~components/Body/TextAlign";
import AccountButtonText from "~components/Body/AccountButtonText";
import DefaultAvatar from "~images/defaultAvatar.png";

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

const linkStyle = {
	margin: 0,
	padding: 0,
};

const Header = ({
	avatar,
	displayname,
	isLoading,
	firstname,
	lastname,
	reputation,
	role,
	signoutUser,
}) => (
	<NavContainer>
		<FlexEnd>
			{!isLoading ? (
				<List>
					{!role || role === "guest" ? (
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
											<StyledLink style={linkStyle} href="/">
												<FlexMiddle>
													<FaUserCircle style={iconStyle} /> Dashboard
												</FlexMiddle>
											</StyledLink>
										</MenuItem>
										<MenuItem style={menuItemStyle}>
											<StyledLink style={linkStyle} href="/profile">
												<FlexMiddle>
													<FaUserCog style={iconStyle} /> Profile
												</FlexMiddle>
											</StyledLink>
										</MenuItem>
										<MenuItem style={menuItemStyle}>
											<StyledLink style={linkStyle} href="/help">
												<FlexMiddle>
													<FaQuestionCircle style={iconStyle} /> Help
												</FlexMiddle>
											</StyledLink>
										</MenuItem>
										<MenuItem style={{ ...menuItemStyle, margin: 0 }}>
											<div
												role="button"
												aria-label="Sign out button"
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
								<StyledLink href="/profile">
									<Flex>
										<span>
											<img
												css="max-height: 22px;max-width: 22px;margin-right: 10px;border-radius: 50%;"
												src={avatar || DefaultAvatar}
												alt="avatar"
											/>
										</span>
										<TextAlign align="left">
											<AccountButtonText>
												{displayname || `${firstname} ${lastname}`}
											</AccountButtonText>
											<AccountButtonText>
												<span css="color: #39c7ff;margin-right: 5px;font-size: 13px;">
													&#9733;
												</span>
												{reputation.toLocaleString()} rep
											</AccountButtonText>
										</TextAlign>
									</Flex>
								</StyledLink>
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

Header.propTypes = {
	avatar: PropTypes.string,
	displayname: PropTypes.string,
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	role: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	reputation: PropTypes.number,
	signoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({ ...users });

const mapDispatchToProps = {
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
