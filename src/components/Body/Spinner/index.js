import PropTypes from "prop-types";
import styled from "styled-components";
import FlexCenter from "~components/Body/FlexCenter";
import FadeIn from "~components/Body/FadeIn";
import Loading from "~components/Body/Loading";

const Spinner = ({ className }) => (
  <FadeIn timing="0.6s">
    <FlexCenter direction="column">
      <div className={className}>
        <div className="spinner" />
      </div>
      <Loading />
    </FlexCenter>
  </FadeIn>
);

Spinner.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(Spinner)`
  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  font-size: 0;
  color: #c7c7c7;
  width: 100px;
  height: 100px;

  & .spinner {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border-style: dashed;
    border-width: 4px;
    border-radius: 100%;
    -webkit-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;
  }

  & .spinner::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    border: 2px solid currentColor;
    border-radius: 100%;
  }
`;
