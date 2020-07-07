import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaUserCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
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
import UserRep from "~components/Body/UserRep";
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
  username,
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
        <Link blue nomargin href="/">
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
                  <Link nomargin href="/u/signin">
                    <Button radius="4px">Sign In</Button>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/u/register">
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
                        <Link href="/settings">
                          <FlexMiddle style={menuStyle}>
                            <MdSettings style={iconStyle} /> Settings
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
                    css="max-height: 22px;max-width: 22px;position: relative;top: -1px;margin-right: 10px;"
                    src={avatar || DefaultAvatar}
                    alt="avatar"
                  />
                  <div css="overflow:hidden;margin-right: 15px;">
                    <AccountButtonText style={{ marginRight: 10 }}>
                      {username || `${firstname} ${lastname}`}
                    </AccountButtonText>
                    <AccountButtonText>
                      <UserRep reputation={reputation} />
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
  username: PropTypes.string,
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
