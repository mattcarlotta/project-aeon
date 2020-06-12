import Button from "~components/Body/Button";
import LandingContainer from "~components/Body/LandingContainer";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";
import Affix from "~components/Body/Affix";

const Home = () => (
  <div css="text-align: center;height:300vh;">
    <Affix top={52}>
      <h2 css="margin-top: 0;">Test</h2>
    </Affix>
    <Head title="Home" />
    <LandingContainer>
      <SubTitle>The best resource for everything.</SubTitle>
      <Link href="/ask-question">
        <Button width={200} style={{ margin: "0 auto" }} onClick={null}>
          Ask A Question
        </Button>
      </Link>
    </LandingContainer>
  </div>
);

export default Home;
