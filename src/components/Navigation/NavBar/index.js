import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUserCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { signoutUser } from "~actions/Authentication";
import AccountButtonText from "~components/Body/AccountButtonText";
import Dropdown from "~components/Body/Dropdown";
import FlexEnd from "~components/Body/FlexEnd";
import FlexMiddle from "~components/Body/FlexMiddle";
import FlexStart from "~components/Body/FlexStart";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import Button from "~components/Body/Button";
import Menu from "~components/Body/Menu";
import MenuItem from "~components/Body/MenuItem";

import NavHeader from "~components/Navigation/NavHeader";
import LoadingNav from "~components/Navigation/LoadingNav";
import Link from "~components/Navigation/Link";
import NavContainer from "~components/Navigation/NavContainer";
import DefaultAvatar from "~images/defaultAvatar.png";

const menuStyle = {
	padding: "0px 35px 0 15px"
};

const iconStyle = {
	marginRight: 15
};

const Header = ({
	avatar,
	displayname,
	isLoading,
	firstname,
	lastname,
	reputation,
	role,
	signoutUser
}) => (
	<NavHeader>
		<NavContainer>
			<FlexStart>
				<Link blue href="/">
					<div css="font-size: 20px;font-weight: bold;">Project Aeon</div>
				</Link>
			</FlexStart>
			<FlexEnd>
				{!isLoading ? (
					<List>
						{!role || role === "guest" ? (
							<>
								<ListItem style={{ fontSize: 16 }}>Welcome, guest!</ListItem>
								<ListItem>
									<Link href="/signin">
										<Button radius="4px">Sign In</Button>
									</Link>
								</ListItem>
								<ListItem>
									<Link href="/register">
										<Button primary radius="4px">
											Register
										</Button>
									</Link>
								</ListItem>
							</>
						) : (
							<ListItem>
								<Dropdown
									menu={
										<Menu>
											<MenuItem>
												<Link href="/dashboard">
													<FlexMiddle style={menuStyle}>
														<MdDashboard style={iconStyle} /> Dashboard
													</FlexMiddle>
												</Link>
											</MenuItem>
											<MenuItem>
												<Link href="/profile">
													<FlexMiddle style={menuStyle}>
														<FaUserCog style={iconStyle} /> Profile
													</FlexMiddle>
												</Link>
											</MenuItem>
											<MenuItem>
												<Link href="/help">
													<FlexMiddle style={menuStyle}>
														<FaQuestionCircle style={iconStyle} /> Help
													</FlexMiddle>
												</Link>
											</MenuItem>
											<MenuItem>
												<Button link padding="0" onClick={signoutUser}>
													<FlexMiddle style={menuStyle}>
														<FaSignOutAlt style={iconStyle} /> Sign Out
													</FlexMiddle>
												</Button>
											</MenuItem>
										</Menu>
									}
								>
									<img
										css="max-height: 22px;max-width: 22px;border-radius: 50%;position: relative;top: -1px;margin-right: 10px;"
										src={avatar || DefaultAvatar}
										alt="avatar"
									/>
									<div css="overflow:hidden;">
										<AccountButtonText>
											{displayname || `${firstname} ${lastname}`}
										</AccountButtonText>
										<AccountButtonText>
											<span css="color: #39c7ff;margin-right: 5px;font-size: 13px;">
												&#9733;
											</span>
											{reputation.toLocaleString()} rep
										</AccountButtonText>
									</div>
								</Dropdown>
							</ListItem>
						)}
					</List>
				) : (
					<LoadingNav />
				)}
			</FlexEnd>
		</NavContainer>
	</NavHeader>
);

Header.propTypes = {
	avatar: PropTypes.string,
	displayname: PropTypes.string,
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	role: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	reputation: PropTypes.number,
	signoutUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication }) => ({ ...authentication });

const mapDispatchToProps = {
	signoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
