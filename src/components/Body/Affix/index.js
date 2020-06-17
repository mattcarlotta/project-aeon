import { Component } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import Col from "~components/Body/Col";
import FlexCenter from "~components/Body/FlexCenter";
import Row from "~components/Body/Row";
import Voter from "~components/Body/Voter";
import Container from "./Container";
import scrollObserver, { unbind } from "./utils/scrollObserver";
import getOffset from "./utils/getOffset";
import FlexSpaceEvenly from "../FlexSpaceEvenly";

class Affix extends Component {
  state = {
    offset: null,
    fixed: false,
    dismissed: false,
  };

  componentDidMount() {
    this.updateMountNodeOffset();
    document.addEventListener("scroll", this.updatePosition);
    scrollObserver(this.mountRef, this.updateMountNodeOffset);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.updatePosition);
    if (this.mountRef) unbind(this.mountRef);
  }

  setMountRef = node => {
    this.mountRef = node;
  };

  removeFixedElement = () => this.setState({ dismissed: true, fixed: false });

  updateMountNodeOffset = () =>
    this.setState({ offset: getOffset(this.mountRef) });

  updatePosition = () => {
    const { dismissed, fixed, offset } = this.state;
    const { onChange, top } = this.props;
    const scrollY = window.scrollY || window.pageYOffset;
    const isFixed = scrollY - (offset.top - top) >= 0;

    if (!dismissed && isFixed !== fixed) {
      this.setState({ fixed: isFixed }, () => onChange(isFixed));
    }
  };

  render = () => {
    const { fixed } = this.state;
    const { children, downVote, top, upVote, votes } = this.props;

    return (
      <div data-test-id="affix-container" ref={this.setMountRef}>
        <Container fixed={fixed} top={top}>
          <div
            css={`
              position: relative;
              overflow: hidden;
              color: ${fixed ? "#fff" : "initial"};
              background: ${fixed ? "#0075e0" : "transparent"};
            `}
          >
            <Row style={{ margin: "0 auto", maxWidth: 750, width: "100%" }}>
              {fixed ? (
                <FlexCenter>
                  <Col xs={4}>
                    <FlexSpaceEvenly>
                      <Voter
                        tertiary
                        downVote={downVote}
                        upVote={upVote}
                        votes={votes}
                      />
                    </FlexSpaceEvenly>
                  </Col>
                  <Col xs={18}>{children}</Col>
                  <Col xs={2}>
                    <Center>
                      <Button
                        tertiary
                        padding="0px 6px"
                        margin="0"
                        width="30px"
                        onClick={this.removeFixedElement}
                      >
                        <FaTimes
                          style={{ fontSize: 12, position: "relative", top: 1 }}
                        />
                      </Button>
                    </Center>
                  </Col>
                </FlexCenter>
              ) : (
                <Col xs={24}>{children}</Col>
              )}
            </Row>
          </div>
        </Container>
        {fixed && children}
      </div>
    );
  };
}

Affix.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  downVote: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  top: PropTypes.number,
  upVote: PropTypes.func.isRequired,
  votes: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Affix.defaultProps = {
  onChange: () => {},
  top: 52,
};

export default Affix;
