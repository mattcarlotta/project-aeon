import { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { FaArrowCircleUp, FaArrowCircleDown, FaTimes } from "react-icons/fa";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import Col from "~components/Body/Col";
import Flex from "~components/Body/Flex";
import FlexCenter from "~components/Body/FlexCenter";
import Row from "~components/Body/Row";
import Votes from "~components/Body/Votes";
import roundVotes from "~utils/round";
import Container from "./Container";
import scrollObserver, { unbind } from "./utils/scrollObserver";
import getOffset from "./utils/getOffset";

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

  removeFixedElement = () => this.setState({ dismissed: true, fixed: false });

  updateMountNodeOffset = () =>
    this.setState({ offset: getOffset(this.mountRef) });

  updatePosition = () => {
    const { dismissed, fixed, offset } = this.state;
    const { onChange, top } = this.props;
    const scrollY = window.scrollY || window.pageYOffset;
    const isFixed = scrollY - (offset.top - top) >= 0;

    if (!dismissed && isFixed !== fixed)
      this.setState({ fixed: isFixed }, () => onChange(isFixed));
  };

  render = () => {
    const { children, downVote, top, upVote, votes } = this.props;

    return (
      <div
        data-test-id="affix-container"
        className="fixed-question-title"
        ref={node => (this.mountRef = node)}
      >
        {children}
        {!this.state.dismissed &&
          createPortal(
            <Container top={top}>
              <div
                css={`
                  position: relative;
                  overflow: hidden;
                  color: #fff;
                  background: #1d1d1d;
                `}
              >
                <Row style={{ margin: "0 auto", maxWidth: 750, width: "100%" }}>
                  {this.state.fixed && (
                    <FlexCenter>
                      <Col
                        xs={4}
                        style={{
                          borderLeft: "1px dashed #6f6f6f",
                          borderRight: "1px dashed #6f6f6f",
                        }}
                      >
                        <Flex>
                          <Button
                            overlay
                            upvote
                            width="20px"
                            padding="4px"
                            radius="4px"
                            onClick={upVote}
                          >
                            <FaArrowCircleUp style={{ fontSize: 12 }} />
                          </Button>
                          <Votes
                            dataVotes={votes}
                            votes={roundVotes(votes)}
                            style={{
                              padding: "0 8px",
                              fontSize: 15,
                              minWidth: 40,
                              fontWeight: "normal",
                            }}
                          />
                          <Button
                            downvote
                            overlay
                            width="20px"
                            padding="4px"
                            radius="4px"
                            onClick={downVote}
                          >
                            <FaArrowCircleDown
                              style={{
                                fontSize: 12,
                              }}
                            />
                          </Button>
                        </Flex>
                      </Col>
                      <Col xs={18}>{children}</Col>
                      <Col xs={2}>
                        <Center>
                          <Button
                            downvote
                            padding="0px 6px"
                            margin="0"
                            width="30px"
                            onClick={this.removeFixedElement}
                          >
                            <FaTimes
                              style={{
                                fontSize: 11,
                                position: "relative",
                                top: 1,
                              }}
                            />
                          </Button>
                        </Center>
                      </Col>
                    </FlexCenter>
                  )}
                </Row>
              </div>
            </Container>,
            document.body,
          )}
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
  votes: PropTypes.number,
};

Affix.defaultProps = {
  onChange: () => {},
  top: 52,
};

export default Affix;
