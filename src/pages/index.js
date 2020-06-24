import PropTypes from "prop-types";
import { connect } from "react-redux";
import LandingContainer from "~components/Body/LandingContainer";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import SubTitle from "~components/Body/SubTitle";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const Home = ({ id }) => (
  <>
    <Head title="Home" url="" />
    <Center>
      <LandingContainer>
        <SubTitle>The best resource for everything.</SubTitle>
        <Link nomargin href={`${id ? "/q/ask" : "/u/signin"}`}>
          <Button width="225px">Ask A Question</Button>
        </Link>
      </LandingContainer>
    </Center>
  </>
);

Home.propTypes = {
  id: PropTypes.string
};

const mapStateToProps = ({ authentication }) => ({
  id: authentication.id
});

export default connect(mapStateToProps)(Home);
