import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { FaLink, FaRegCalendarPlus, FaUser } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import Avatar from "~components/Body/Avatar";
import Center from "~components/Body/Center";
import Col from "~components/Body/Col";
import Container from "~components/Body/Container";
import Flex from "~components/Body/Flex";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import MissingDetails from "~components/Body/MissingDetails";
import Preview from "~components/Body/Preview";
import Tab from "~components/Body/Tab";
import Tabs from "~components/Body/Tabs";
import TabPanel from "~components/Body/TabPanel";
import Timestamp from "~components/Body/Timestamp";
import UserRep from "~components/Body/UserRep";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import withAuthentication from "~containers/App/withAuthentication";
import UploadImageForm from "~containers/Forms/UploadImage";
import dayjs from "~utils/dayjs";
import Website from "~components/Body/Website";

const iconStyle = { position: "relative", top: 1, marginRight: 5 };

const Profile = () => {
  const [state, setState] = useState({
    showTab: 0,
    showImageForm: false
  });
  const { showTab } = state;
  const authProps = useSelector(({ authentication }) => ({
    ...authentication
  }));
  const {
    description,
    firstname,
    lastname,
    registered,
    reputation,
    role,
    username,
    website
  } = authProps;

  const toggleImageForm = useCallback(
    () =>
      setState(prevState => ({
        ...prevState,
        showImageForm: !prevState.showImageForm
      })),
    []
  );

  const setTab = useCallback(
    (_, tab) => setState(prevState => ({ ...prevState, showTab: tab })),
    []
  );

  return (
    <>
      <Head title="Profile" url="u/profile" />
      <Col xs={24} style={{ padding: "0 10px", marginBottom: 20 }}>
        <Container style={{ padding: "20px" }}>
          <Flex direction="row" justify="left">
            <Flex direction="column" margin="0 10px 0" width="250px">
              <Center>
                <div css="height: 250px;">
                  {state.showImageForm ? (
                    <UploadImageForm
                      {...state}
                      {...authProps}
                      closeForm={toggleImageForm}
                    />
                  ) : (
                    <Avatar {...authProps} toggleImageForm={toggleImageForm} />
                  )}
                </div>
                <Link blue nomargin href="/u/[id]" asHref={`/u/${username}`}>
                  <div css="font-size: 20px;font-weight: bold;">
                    u&#47;{username}
                  </div>
                </Link>
                <UserRep reputation={reputation} />
              </Center>
            </Flex>
            <Flex direction="column" align="left" justify="left">
              <Tabs value={showTab} onChange={setTab}>
                {["Profile", "Activity", "Comments", "Questions"].map(tab => (
                  <Tab key={tab} label={tab} />
                ))}
              </Tabs>
              <TabPanel value={showTab} index={0}>
                <h1 css="margin: 0;font-size: 35px;">
                  {firstname}&nbsp;
                  {lastname}
                </h1>
                <div>
                  <FaUser style={iconStyle} /> {role}
                </div>
                {website && (
                  <div>
                    <FaLink style={iconStyle} /> <Website href={website} />
                  </div>
                )}
                <div>
                  <FaRegCalendarPlus style={iconStyle} />
                  {dayjs(registered).format("MMMM Do, YYYY")}
                </div>
                <div>
                  <MdUpdate
                    style={{ ...iconStyle, top: 2, left: -1, fontSize: 17 }}
                  />
                  Last active&nbsp;
                  <Timestamp date={registered} />
                </div>
                <div css="margin: 10px 0;">
                  {description ? (
                    <Preview style={{ marginBottom: 0 }}>
                      <MarkdownPreviewer>{description}</MarkdownPreviewer>
                    </Preview>
                  ) : (
                    <MissingDetails>
                      You haven&#39;t included a brief description of yourself
                      that&#39;ll be shown on your profile.
                    </MissingDetails>
                  )}
                </div>
              </TabPanel>
              <TabPanel value={showTab} index={1}>
                Activity
              </TabPanel>
              <TabPanel value={showTab} index={2}>
                Comments
              </TabPanel>
              <TabPanel value={showTab} index={3}>
                Questions
              </TabPanel>
            </Flex>
          </Flex>
        </Container>
      </Col>
    </>
  );
};

export default withAuthentication(Profile);
