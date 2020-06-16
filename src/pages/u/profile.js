import { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import { deleteUserAvatar } from "~actions/Authentication";
import Avatar from "~components/Body/Avatar";
import ProfileTab from "~components/Body/ProfileTab";
import Center from "~components/Body/Center";
import Col from "~components/Body/Col";
import Container from "~components/Body/Container";
import Row from "~components/Body/Row";
import Tab from "~components/Body/Tab";
import Tabs from "~components/Body/Tabs";
import TabPanel from "~components/Body/TabPanel";
import Title from "~components/Body/Title";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";
import Spinner from "~components/Body/Spinner";
import withAuthentication from "~containers/App/withAuthentication";
import UploadImageForm from "~containers/Forms/UploadImage";
import dayjs from "~utils/dayjs";

class Profile extends Component {
  state = {
    showTab: 0,
    showProfileForm: false,
    showImageForm: false,
  };

  toggleProfileForm = () =>
    this.setState(prevState => ({
      showProfileForm: !prevState.showProfileForm,
    }));

  toggleImageForm = () =>
    this.setState(prevState => ({
      ...prevState,
      showImageForm: !prevState.showImageForm,
    }));

  setTab = (_, tab) => this.setState({ showTab: tab });

  render = () => {
    const { settings } = this.props;
    const { showTab } = this.state;

    return (
      <>
        <Head title="Profile" />
        {!isEmpty(settings) ? (
          <Row padding="0 10px">
            <Col md={24} lg={7}>
              <Container style={{ paddingTop: 20, minHeight: 514 }}>
                <Center>
                  <div css="height: 250px;">
                    {this.state.showImageForm ? (
                      <UploadImageForm
                        {...this.state}
                        closeForm={this.toggleImageForm}
                      />
                    ) : (
                      <Avatar
                        {...this.props}
                        toggleImageForm={this.toggleImageForm}
                      />
                    )}
                  </div>
                  <Title
                    style={{
                      marginBottom: "15px",
                      fontSize: 28,
                      color: "#0f7ae5",
                    }}
                  >
                    {settings.username}
                  </Title>
                  <Title style={{ marginTop: 10 }}>Role</Title>
                  <SubTitle>{settings.role}</SubTitle>
                  <Title>Registered</Title>
                  <SubTitle>
                    {dayjs(settings.registered).format("MMMM Do, YYYY")}
                  </SubTitle>
                  <Title>Reputation</Title>
                  <SubTitle>{settings.reputation}</SubTitle>
                </Center>
              </Container>
            </Col>
            <Col md={24} lg={17}>
              <Container style={{ overflow: "hidden" }}>
                <Tabs value={showTab} onChange={this.setTab}>
                  {["Activity", "Profile", "Settings"].map(tab => (
                    <Tab key={tab} label={tab} />
                  ))}
                </Tabs>
                <TabPanel value={showTab} index={0}>
                  Activity
                </TabPanel>
                <TabPanel value={showTab} index={1}>
                  <ProfileTab
                    {...settings}
                    showProfileForm={this.state.showProfileForm}
                    toggleProfileForm={this.toggleProfileForm}
                  />
                </TabPanel>
                <TabPanel value={showTab} index={2}>
                  Edit Settings
                </TabPanel>
              </Container>
            </Col>
          </Row>
        ) : (
          <Spinner />
        )}
      </>
    );
  };
}

Profile.propTypes = {
  deleteUserAvatar: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    email: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    registered: PropTypes.string,
    reputation: PropTypes.number,
    website: PropTypes.string,
  }),
};

const mapStateToProps = ({ authentication }) => ({
  settings: { ...authentication },
});

const mapDispatchToProps = {
  deleteUserAvatar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withAuthentication(Profile));
