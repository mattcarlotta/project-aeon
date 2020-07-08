import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import get from "lodash.get";
import Avatar from "~components/Body/Avatar";
import Center from "~components/Body/Center";
import Col from "~components/Body/Col";
import Container from "~components/Body/Container";
import Flex from "~components/Body/Flex";
import FlexCenter from "~components/Body/FlexCenter";
import Tab from "~components/Body/Tab";
import Tabs from "~components/Body/Tabs";
import TabPanel from "~components/Body/TabPanel";
import ViewProfile from "~components/Body/ViewProfile";
import UserRep from "~components/Body/UserRep";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import withAuthentication from "~containers/App/withAuthentication";
import UploadImageForm from "~containers/Forms/UploadImage";

const Profile = () => {
  const router = useRouter();
  const tab = get(router, ["query", "tab"]);
  const [state, setState] = useState({
    showTab: tab || "profile",
    showImageForm: false
  });
  const { showTab } = state;
  const authProps = useSelector(({ authentication }) => ({
    ...authentication
  }));

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

  useEffect(() => {
    if (showTab !== tab)
      Router.push(`/profile?tab=${showTab}`, undefined, {
        shallow: true
      });
  }, [showTab, tab]);

  return (
    <>
      <Head title="Profile" url="u/profile" />
      <Col xs={24} style={{ padding: "0 10px", marginBottom: 20 }}>
        <Container style={{ padding: "20px 20px 20px 250px" }}>
          <Flex direction="row" justify="left">
            <FlexCenter
              floating
              direction="column"
              height="350px"
              width="250px"
            >
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
                <Link
                  blue
                  nomargin
                  href="/u/[id]"
                  asHref={`/u/${authProps.username}`}
                >
                  <div css="font-size: 20px;font-weight: bold;">
                    u&#47;{authProps.username}
                  </div>
                </Link>
                <UserRep reputation={authProps.reputation} />
              </Center>
            </FlexCenter>
            <Flex direction="column" align="left" justify="left">
              <Tabs value={showTab} onChange={setTab}>
                {["profile", "activity", "comments", "questions"].map(tab => (
                  <Tab key={tab} label={tab} value={tab} />
                ))}
              </Tabs>
              <TabPanel value={showTab} index="profile">
                <ViewProfile {...authProps} />
              </TabPanel>
              <TabPanel value={showTab} index="activity">
                Activity
              </TabPanel>
              <TabPanel value={showTab} index="comments">
                Comments
              </TabPanel>
              <TabPanel value={showTab} index="questions">
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
