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

  .mde-editor.mde-editor:hover {
    & .mde-textarea-wrapper {
      border-color: #40a9ff;
      transition: border-color 0.2s ease-in-out;
    }
  }

  .mde-toolbar.mde-toolbar,
  .mde-grip.mde-grip {
    background: #fff;
  }

  .mde-toolbar.mde-toolbar {
    border-radius: 4px 4px 0 0;
    border-top: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
  }

  .mde-grip.mde-grip {
    border-radius: 0px 0px 4px 4px;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }

  .mde-textarea-wrapper.mde-textarea-wrapper {
    border: 1px solid #d9d9d9;
  }

  .mde-preview-empty.mde-preview-empty {
    color: #bfbfbf;
  }

  .svg-icon {
    color: #252525;
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #188fff;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #188fff, 0 0 5px #188fff;
    opacity: 1;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: #188fff;
    border-left-color: #188fff;
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  .tooltip-container.tooltip-container  {
    text-align: center;
    box-shadow: 0px 8px 8px -2px rgba(0, 0, 0, 0.25);
    background-color: rgba(3, 88, 243, 0.7);
  }

  .tooltip-arrow.tooltip-arrow {
    color: rgba(3, 88, 243, 0.55);
  }

  /* Base16 Atelier Forest Light - Theme */
  /* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest) */
  /* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

  /* Atelier-Forest Comment */
  .hljs-comment,
  .hljs-quote {
    color: #766e6b;
  }

  /* Atelier-Forest Red */
  .hljs-variable,
  .hljs-template-variable,
  .hljs-attribute,
  .hljs-tag,
  .hljs-name,
  .hljs-regexp,
  .hljs-link,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #f22c40;
  }

  /* Atelier-Forest Orange */
  .hljs-number,
  .hljs-meta,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-literal,
  .hljs-type,
  .hljs-params {
    color: #df5320;
  }

  /* Atelier-Forest Green */
  .hljs-string,
  .hljs-symbol,
  .hljs-bullet {
    color: #7b9726;
  }

  /* Atelier-Forest Blue */
  .hljs-title,
  .hljs-section {
    color: #407ee7;
  }

  /* Atelier-Forest Purple */
  .hljs-keyword,
  .hljs-selector-tag {
    color: #6666ea;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    background: #f1efee;
    color: #68615e;
    padding: 0.5em;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;
