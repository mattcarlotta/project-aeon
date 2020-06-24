import FlexCenter from "~components/Body/FlexCenter";
import HomeIcon from "~components/Body/HomeIcon";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import SubTitle from "~components/Body/SubTitle";
import Title from "~components/Body/Title";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const ServerErrorPage = () => (
  <FlexCenter>
    <Head title="Server Error" url="500" />
    <Center style={{ color: "#03a9f3", padding: "100px" }}>
      <Title style={{ color: "#03a9f3", fontSize: "120px" }}>404</Title>
      <Title style={{ color: "#03a9f3", marginTop: "-20px" }}>
        Server Error.
      </Title>
      <SubTitle>
        Uh oh, it looks the server has encountered an error. Please wait a few
        minutes before refreshing the page or clicking the link below. We
        appologize for this inconvience.
      </SubTitle>
      <Link href="/">
        <Button radius="4px" type="button">
          <HomeIcon />
          <span css="margin-left: 5px;">Go Home</span>
        </Button>
      </Link>
    </Center>
  </FlexCenter>
);

export default ServerErrorPage;
