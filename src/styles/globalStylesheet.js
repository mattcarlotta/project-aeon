/* istanbul ignore file */
import { createGlobalStyle } from "styled-components";
import VarelaRound from "./assets/fonts/VarelaRound-Regular.ttf";

export default createGlobalStyle`
  @font-face {
    font-family: 'Valera Round';
    font-style: normal;
    font-weight: normal;
    src: url(${VarelaRound}) format('truetype');
  }
  #__next, body, html {
    height: 100%;
  }
  html,body {
    width: 100% !important;
    margin: 0;
    padding: 0;
  }
  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Valera Round", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    background-color: #ebebeb;
    min-height: 100vh;
    font-size: 15px;
  }
  svg:not(:root) {
    overflow: visible;
  }
  @-webkit-keyframes wave {
    0% {
      left: -60%;
    }
    100% {
      left: 125%;
    }
  }
  @keyframes wave {
    0% {
      left: -60%;
    }
    100% {
      left: 125%;
    }
  }
  @-webkit-keyframes pulse {
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
  @-webkit-keyframes pop {
    0% {
      top: 6px;
      height: 46px;
    }
    50%, 100% {
      top: 19px;
      height: 21px;
    }
  }
  @keyframes pop {
    0% {
      top: 6px;
      height: 46px;
    }
    50%, 100% {
      top: 19px;
      height: 21px;
    }
  }
  @-webkit-keyframes delay {
    0%, 40%, 100% {
      -webkit-transform: scaleY(0.05);
    }
    20% {
      -webkit-transform: scaleY(1.0);
    }
  }
  @keyframes delay {
    0%, 40%, 100% {
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }
    20% {
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
  .link {
    cursor: pointer;
    display: block;
    color: #03a9f3;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
  }
  .link:hover {
    text-decoration: none;
  }
  [ant-click-animating-without-extra-node]:after {
    -webkit-animation: none !important;
    -moz-animation: none !important;
    -o-animation: none !important;
    -ms-animation: none !important;
	  animation: none !important;
  }
  textarea::placeholder {
    color: #bfbfbf;
  }
  .ant-select {
    width: 100%;
  }
  .ant-select-selection--multiple .ant-select-selection__placeholder {
    margin-left: 8px;
  }
  .ant-select-selection__rendered {
    padding: 8px;
    font-size: 16px;
  }
  .ant-select-selection:focus{
    box-shadow: unset;
  }
  .ant-select-selection
  *, ::after, ::before {
    box-sizing: border-box;
  }
  ::-moz-focus-inner {
    border: 0;
  }
`;
