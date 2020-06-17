import { Component } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import Button from "~components/Body/Button";
import Center from "~components/Body/Center";
import Col from "~components/Body/Col";
import Row from "~components/Body/Row";
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
    const { children, top } = this.props;

    return (
      <div data-test-id="affix-container" ref={this.setMountRef}>
        <Container fixed={fixed} top={top}>
          <div
            css={`
              position: relative;
              overflow: hidden;
              color: ${fixed ? "#fff" : "initial"};
              background: ${fixed ? "#0075e0" : "transparent"};
              transition: ${fixed
                ? "color, background 0.2s ease-in-out;"
                : "none"};
              border-radius: 0 0 4px 4px;
            `}
          >
            <Row style={{ margin: "0 auto", maxWidth: 700, width: "100%" }}>
              <Col xs={fixed ? 22 : 24}>{children}</Col>
              {fixed && (
                <Col xs={2}>
                  <Center>
                    <Button
                      tertiary
                      padding="0px 6px"
                      margin="20px 0 0 0"
                      width="30px"
                      onClick={this.removeFixedElement}
                    >
                      <FaTimes
                        style={{ fontSize: 12, position: "relative", top: 1 }}
                      />
                    </Button>
                  </Center>
                </Col>
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
  top: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Affix.defaultProps = {
  onChange: () => {},
  top: 52,
};

export default Affix;
