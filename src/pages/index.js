import LandingContainer from "~components/Body/LandingContainer";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const Home = () => (
  <Center>
    <Head title="Home" />
    <LandingContainer>
      <SubTitle>The best resource for everything.</SubTitle>
      <Link nomargin href="/q/ask">
        <Button width="225px">Ask A Question</Button>
      </Link>
    </LandingContainer>
  </Center>
);

export default Home;
