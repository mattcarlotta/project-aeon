import { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import Col from "~components/Body/Col";
import CloseButton from "~components/Body/CloseButton";
import Flex from "~components/Body/Flex";
import FlexCenter from "~components/Body/FlexCenter";
import Row from "~components/Body/Row";
import Voter from "~components/Body/Voter";
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
    const { children, top } = this.props;
    const { dismissed, fixed } = this.state;

    return (
      <div
        data-test-id="affix-container"
        className="fixed-question-title"
        ref={node => (this.mountRef = node)}
      >
        {children}
        {!dismissed &&
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
                  {fixed && (
                    <FlexCenter>
                      <Col
                        xs={4}
                        style={{
                          borderLeft: "1px dashed #6f6f6f",
                          borderRight: "1px dashed #6f6f6f",
                        }}
                      >
                        <Flex>
                          <Voter align="horizontal" {...this.props} />
                        </Flex>
                      </Col>
                      <Col xs={17}>{children}</Col>
                      <Col xs={3}>
                        <CloseButton onClick={this.removeFixedElement} />
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
  onChange: PropTypes.func,
  top: PropTypes.number,
  votes: PropTypes.number,
};

Affix.defaultProps = {
  onChange: () => {},
  top: 52,
};

export default Affix;
