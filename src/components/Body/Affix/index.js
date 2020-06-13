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
    const scrollY = window.scrollY || window.pageYOffset;
    const fixed = scrollY - (this.state.offset.top - this.props.top) >= 0;

    if (!this.state.dismissed && fixed !== this.state.fixed) {
      this.setState({ fixed }, () => this.props.onChange(this.state.fixed));
    }
  };

  render = () => {
    const { fixed } = this.state;
    const { fullscreen } = this.props;
    const childrenSpan = fixed ? (fullscreen ? 23 : 22) : 24;
    const buttonSpan = fixed && fullscreen ? 1 : 2;

    return (
      <div data-test-id="affix-container" ref={this.setMountRef}>
        <Container {...this.state} {...this.props}>
          <div
            css={`
              position: relative;
              overflow: hidden;
              color: ${fixed ? "#fff" : "initial"};
              background: ${fixed ? "#555e73" : "transparent"};
              transition: background 0.2s ease-in-out;
            `}
          >
            <Row>
              <Col style={{ padding: "0 10px" }} xs={childrenSpan}>
                {this.props.children}
              </Col>
              {fixed && (
                <Col xs={buttonSpan}>
                  <Center>
                    <Button
                      tertiary
                      padding="0px 6px"
                      margin="18px 0 0 0"
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
        {fixed && (
          <div
            data-testid="affix-placeholder"
            style={{
              width: this.state.offset.width,
              height: this.state.offset.height,
            }}
          />
        )}
      </div>
    );
  };
}

Affix.propTypes = {
  fullscreen: PropTypes.bool,
  top: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Affix.defaultProps = {
  fullscreen: false,
  onChange: () => {},
  top: 52,
};

export default Affix;
