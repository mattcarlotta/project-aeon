import { createGlobalStyle } from "styled-components";
import VarelaRound from "./assets/fonts/VarelaRound-Regular.ttf";

export default createGlobalStyle`
  @font-face {
    font-family: 'Valera Round';
    font-style: normal;
    font-weight: normal;
    src: url(${VarelaRound}) format('truetype');
  }
  
  html,body,#__next {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Valera Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    background-color: #ebebeb;
    min-height: 100vh;
    font-size: 15px;
  }

  svg:not(:root) {
    overflow: visible;
  }

  @keyframes wave {
    0% {
      left: -60%;
    }
    100% {
      left: 125%;
    }
  }

  @keyframes pulse {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #e4e4e4;
    }
    100% {
      background-color: #eee;
    }
  }

  @keyframes pop {
    0% {
      top: 6px;
      height: 46px;
    }
    50%,
    100% {
      top: 19px;
      height: 21px;
    }
  }

  @keyframes delay {
    0%,
    40%,
    100% {
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`;
