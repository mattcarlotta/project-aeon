import { Component, createRef } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import Container from "./Container";
import scrollObserver, { unbind } from "./utils/scrollObserver";
import getOffset from "./utils/getOffset";
import Button from "~components/Body/Button";
import Col from "~components/Body/Col";
import Row from "~components/Body/Row";
import Center from "../Center";

class Affix extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: null,
      fixed: false,
      removeFixed: false,
    };

    this.mountRef = createRef();
  }

  componentDidMount() {
    this.updateMountNodeOffset();
    document.addEventListener("scroll", this.updatePosition);
    scrollObserver(this.mountRef.current, this.updateMountNodeOffset);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.updatePosition);
    if (this.mountRef.current) unbind(this.mountRef.current);
  }

  removeFixedElement = () => this.setState({ removeFixed: true, fixed: false });

  updateMountNodeOffset = () =>
    this.setState({ offset: getOffset(this.mountRef.current) });

  updatePosition = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const fixed = scrollY - (this.state.offset.top - this.props.top) >= 0;

    if (!this.state.removeFixed && fixed !== this.state.fixed) {
      this.setState({ fixed }, () => this.props.onChange(this.state.fixed));
    }
  };

  render = () => (
    <div data-test-id="affix-container" ref={this.mountRef}>
      <Container {...this.state} {...this.props}>
        <div
          css={`
            position: relative;
            overflow: hidden;
            color: ${this.state.fixed ? "#fff" : "initial"};
            background: ${this.state.fixed ? "#0075e0" : "transparent"};
            transition: background 0.2s ease-in-out;
          `}
        >
          <Row>
            <Col xs={this.state.fixed ? 22 : 24}>{this.props.children}</Col>
            {this.state.fixed && (
              <Col xs={2}>
                <Center>
                  <Button
                    tertiary
                    padding="0px 6px"
                    margin="10px 0 0 0"
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
      {this.state.fixed && (
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
