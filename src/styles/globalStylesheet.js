import { createGlobalStyle } from "styled-components";
import UbuntuBold from "./assets/fonts/Ubuntu-Bold.ttf";
import UbuntuBoldItalic from "./assets/fonts/Ubuntu-BoldItalic.ttf";
import UbuntuItalic from "./assets/fonts/Ubuntu-Italic.ttf";
import UbuntuLight from "./assets/fonts/Ubuntu-Light.ttf";
import UbuntuLightItalic from "./assets/fonts/Ubuntu-LightItalic.ttf";
import UbuntuMedium from "./assets/fonts/Ubuntu-Medium.ttf";
import UbuntuMediumItalic from "./assets/fonts/Ubuntu-MediumItalic.ttf";
import UbuntuRegular from "./assets/fonts/Ubuntu-Regular.ttf";

const fontFamily = `Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important`;

export default createGlobalStyle`
  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 700;
    src: url(${UbuntuBold}) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 700;
    src: url(${UbuntuBoldItalic}) format('truetype');
  }
  
  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: normal;
    src: url(${UbuntuItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 300;
    src: url(${UbuntuLight}) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 300;
    src: url(${UbuntuLightItalic}) format('truetype');
  }

   @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 500;
    src: url(${UbuntuMedium}) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: italic;
    font-weight: 500;
    src: url(${UbuntuMediumItalic}) format('truetype');
  }

  @font-face {
    font-family: 'Ubuntu';
    font-style: normal;
    font-weight: 400;
    src: url(${UbuntuRegular}) format('truetype');
  }

  html,body,#__next {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${fontFamily};
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

  /* SMDE Editor Overrides */

  .mde-editor.mde-editor, .mde-comment.mde-comment {
    & .has-error {
      border-color: #d14023;
      transition: border-color 0.2s ease-in-out;
    }
  }

  .mde-comment {
    background: transparent;

    & .mde-textarea-wrapper {
      border-radius: 0 0 4px 4px;
    }
  }

  .mde-editor.mde-editor:hover, .mde-comment.mde-comment:hover {
    & .mde-textarea-wrapper {
      border-color: #40a9ff;
      transition: border-color 0.2s ease-in-out;
    }

    & .mde-textarea-wrapper.preview {
      border-color: #d9d9d9;
      transition: border-color 0.2s ease-in-out;
    }
  }

  .mde-toolbar.mde-toolbar,
  .mde-grip.mde-grip {
    background: #fff;
  }

  .mde-toolbar.mde-toolbar {
    background: #efefef;
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

  .mde-textarea {
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
      color: #ccc;
    }
  }

  .mde-textarea-wrapper.mde-textarea-wrapper {
    border: 1px solid #d9d9d9;
  }

  .mde-preview {
    background: transparent;
    
    p {
      font-size: 16px;
    }
  }

  .mde-textarea-wrapper-question.mde-textarea-wrapper-question {
    border: 0;
    padding: 0;

    p {
      font-size: 15px;
    }
  }

  .mde-question-preview {
    height: auto !important;
    background: transparent;
    margin-bottom: 10px;
    
    p {
      font-size: 16px;
    }
  }

  .mde-textarea-wrapper.preview {
    background: #fdfdfd;
  }

  .mde-preview-empty.mde-preview-empty {
    color: #bfbfbf;
  }

  .svg-icon {
    color: #252525;
  }
  
  /* Nprogress Copyright (c) 2013-2014 Rico Sta. Cruz */
  /* https://github.com/rstacruz/nprogress */

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

  /* github.com style (c) Vasily Polovnyov <vast@whiteants.net>  */
  /* https://github.com/highlightjs/highlight.js/blob/master/src/styles/github.css  */

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #333;
    background: #f8f8f8;
  }

  .hljs-attr {
    color: #0043ff;
  }

  .hljs-comment,
  .hljs-quote {
    color: #998;
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #333;
    font-weight: bold;
  }

  .hljs-number,
  .hljs-literal,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-tag .hljs-attr {
    color: #008080;
  }

  .hljs-string,
  .hljs-doctag {
    color: #d14;
  }

  .hljs-title,
  .hljs-section,
  .hljs-selector-id {
    color: #900;
    font-weight: bold;
  }

  .hljs-subst {
    font-weight: normal;
  }

  .hljs-type,
  .hljs-class .hljs-title {
    color: #458;
    font-weight: bold;
  }

  .hljs-tag,
  .hljs-name,
  .hljs-attribute {
    color: #000080;
    font-weight: normal;
  }

  .hljs-regexp,
  .hljs-link {
    color: #009926;
  }

  .hljs-symbol,
  .hljs-bullet {
    color: #990073;
  }

  .hljs-built_in,
  .hljs-builtin-name {
    color: #0086b3;
  }

  .hljs-meta {
    color: #999;
    font-weight: bold;
  }

  .hljs-deletion {
    background: #fdd;
  }

  .hljs-addition {
    background: #dfd;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  /* antd v4.3.3 Copyright 2015-present, Alipay, Inc. All rights reserved. */
  /* https://github.com/ant-design/ant-design */

  @keyframes antZoomIn {
    0% {
      -webkit-transform: scale(0.2);
              transform: scale(0.2);
      opacity: 0;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes antZoomOut {
    0% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
    100% {
      -webkit-transform: scale(0.2);
              transform: scale(0.2);
      opacity: 0;
    }
  }

  @keyframes antSlideUpOut {
    0% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: 0% 0%;
              transform-origin: 0% 0%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scaleY(0.8);
              transform: scaleY(0.8);
      -webkit-transform-origin: 0% 0%;
              transform-origin: 0% 0%;
      opacity: 0;
    }
  }

  @keyframes antSlideUpIn {
    0% {
      -webkit-transform: scaleY(0.8);
              transform: scaleY(0.8);
      -webkit-transform-origin: 0% 0%;
              transform-origin: 0% 0%;
      opacity: 0;
    }
    100% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: 0% 0%;
              transform-origin: 0% 0%;
      opacity: 1;
    }
  }

  @keyframes antSlideDownIn {
    0% {
      -webkit-transform: scaleY(0.8);
              transform: scaleY(0.8);
      -webkit-transform-origin: 100% 100%;
              transform-origin: 100% 100%;
      opacity: 0;
    }
    100% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: 100% 100%;
              transform-origin: 100% 100%;
      opacity: 1;
    }
  }

  @keyframes antSlideDownOut {
    0% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1);
      -webkit-transform-origin: 100% 100%;
              transform-origin: 100% 100%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scaleY(0.8);
              transform: scaleY(0.8);
      -webkit-transform-origin: 100% 100%;
              transform-origin: 100% 100%;
      opacity: 0;
    }
  }

  .has-error {
    & .ant-select-selector.ant-select-selector {
      border-color: #d14023;
      transition: border-color 0.2s ease-in-out;
    }
  }

  .ant-select {
    margin: 0;
    padding: 0;
    list-style: none;
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.65);
    font-size: 16px;
    font-variant: tabular-nums;
    line-height: 1.5;
    font-feature-settings: "tnum";
    position: relative;
    display: inline-block;
    outline: 0;
    width: 100%;
  }

  .ant-select-multiple .ant-select-selector {
    position: relative;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 6px 10px 6px 5px;

    &:hover {
      border-color: #1e90ff;
    }

    &:after {
      display: inline-block;
      width: 0;
      margin: 2px 0;
      line-height: 24px;
      content: "\\a0";
    }
  }

  .ant-select-multiple .ant-select-selection-search {
    position: relative;
    margin-left: .5px;
  }

  .ant-select:not(.ant-select-disabled):hover .ant-select-selector,.ant-select-focused.ant-select-multiple .ant-select-selector {
    border-color: #1e90ff;
  }

  .ant-select-multiple .ant-select-selection-search:first-child .ant-select-selection-search-input {
    margin-left: 6.5px;
  } 

  .ant-select-multiple .ant-select-selector .ant-select-selection-search-input {
    cursor: auto;
    argin: 0;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    min-width: 3px;
    line-height: 1.5715;
    transition: all .3s;
    touch-action: manipulation;
  }

  .ant-select-multiple .ant-select-selection-search-mirror {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    white-space: nowrap;
    visibility: hidden;
    line-height: 1.5715;
    transition: all .3s;
  }

  .ant-select-multiple .ant-select-selection-placeholder {
    font-size: 16px;
    position: absolute;
    top: 51%;
    right: 11px;
    left: 12px;
    transform: translateY(-50%);
    transition: all .3s;
    flex: 1 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: .4;
  }

  .ant-select-multiple .ant-select-selection-item {
    position: relative;
    display: flex;
    flex: none;
    box-sizing: border-box;
    max-width: 100%;
    height: 24px;
    margin-top: 2px;
    margin-right: 4px;
    margin-bottom: 2px;
    padding: 0 4px 0 8px;
    line-height: 22px;
    color: #138ac2;
    background: #e6f8ff;
    border: 1px solid #87d6e8;
    border-radius: 2px;
    cursor: default;
    transition: font-size .3s,line-height .3s,height .3s;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ant-select-multiple .ant-select-selection-item-content {
    display: inline-block;
    margin-right: 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ant-select-multiple .ant-select-selection-item-remove {
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 700;
    font-size: 12px;
    line-height: inherit;
    cursor: pointer;
    display: inline-block;
    transition: background 0.2s ease-in-out;

    &:hover {
      color: #1baef3;
    }
  }

  .ant-select-multiple .ant-select-selection-item-remove>.anticon {
    vertical-align: -.2em;
  }
  
  .ant-select-multiple .ant-select-selection-item-remove>* {
    line-height: 1;
  }

  .ant-select-dropdown-empty {
    color: rgba(0,0,0,.25);
  }

  .ant-select-item-empty, .ant-select-item {
    position: relative;
    display: block;
    min-height: 32px;
    padding: 5px 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
  }

  .ant-select-dropdown-hidden {
    display: none;
  }

  .ant-select-dropdown {
    margin: 0;
    color: rgba(0,0,0,.65);
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    position: absolute;
    top: -9999px;
    left: -9999px;
    z-index: 1050;
    box-sizing: border-box;
    padding: 4px 0;
    overflow: hidden;
    font-size: 14px;
    font-variant: normal;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
    box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
  }

  .ant-select-dropdown.slide-up-enter.slide-up-enter-active.ant-select-dropdown-placement-bottomLeft,
  .ant-select-dropdown.slide-up-appear.slide-up-appear-active.ant-select-dropdown-placement-bottomLeft {
    animation-name: antSlideUpIn;
  }

  .ant-select-dropdown.slide-up-enter.slide-up-enter-active.ant-select-dropdown-placement-topLeft,
  .ant-select-dropdown.slide-up-appear.slide-up-appear-active.ant-select-dropdown-placement-topLeft {
    animation-name: antSlideDownIn;
  }

  .ant-select-dropdown.slide-up-leave.slide-up-leave-active.ant-select-dropdown-placement-bottomLeft {
    animation-name: antSlideUpOut;
  }
  .ant-select-dropdown.slide-up-leave.slide-up-leave-active.ant-select-dropdown-placement-topLeft {
    animation-name: antSlideDownOut;
  }

  .ant-select-dropdown.slide-up-leave.slide-up-leave-active.ant-select-dropdown-placement-bottomLeft {
    animation-name: antSlideUpOut;
  }
  .ant-select-dropdown.slide-up-enter.slide-up-enter-active.ant-select-dropdown-placement-bottomLeft,
  .ant-select-dropdown.slide-up-appear.slide-up-appear-active.ant-select-dropdown-placement-bottomLeft {
    animation-name: antSlideUpIn;
  }

  .slide-up-enter,
  .slide-up-appear,
  .slide-up-leave,
  .slide-down-enter,
  .slide-down-appear,
  .slide-down-leave  {
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-play-state: paused;
  }

  .slide-up-enter.slide-up-enter-active,
  .slide-up-appear.slide-up-appear-active {
    animation-name: antSlideUpIn;
    animation-play-state: running;
  }

  .slide-up-leave.slide-up-leave-active {
    animation-name: antSlideUpOut;
    animation-play-state: running;
    pointer-events: none;
  }

  .slide-up-enter,
  .slide-up-appear,
  .slide-down-enter,
  .slide-down-appear {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }

  .slide-up-leave, .slide-down-leave {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }

  .slide-down-enter.slide-down-enter-active,
  .slide-down-appear.slide-down-appear-active {
    animation-name: antSlideDownIn;
    animation-play-state: running;
  }

  .slide-down-leave.slide-down-leave-active {
    animation-name: antSlideDownOut;
    animation-play-state: running;
    pointer-events: none;
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: #f5f5f5;
  }

  .ant-select-item-option {
    display: flex;
  }


  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    color: rgba(0,0,0,.65);
    font-weight: 600;
    background-color: #e6f7ff;
  }

  .ant-select-item {
    color: rgba(0,0,0,.65);
    cursor: pointer;
    transition: background .3s ease;
  }

  .ant-select-item-option-content {
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .ant-select-item-option-state {
    flex: none;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) .ant-select-item-option-state {
    color: #1890ff;
  }
  
  .anticon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  svg:not(:root) {
    overflow: visible;
  }

  .anticon svg {
    display: inline-block;
  }

  .zoom-enter, .zoom-appear  {
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-play-state: paused;
    transform: scale(0);
    opacity: 0;
    animation-timing-function: cubic-bezier(0.08, 0.82, 0.17, 1);
  }

  .zoom-enter.zoom-enter-active, .zoom-appear.zoom-appear-active {
    animation-name: antZoomIn;
    animation-play-state: running;
  }

  .zoom-leave {
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-play-state: paused;
    animation-timing-function: cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  .zoom-leave.zoom-leave-active {
    animation-name: antZoomOut;
    animation-play-state: running;
    pointer-events: none;
  }

  /* Toastify Overrides */

  .Toastify__toast {
    padding: 0;
  }

  .Toastify__toast--error,
  .Toastify__toast--info,
  .Toastify__toast--success,
  .Toastify__toast--warning {
    background: white;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);
  }

  .Toastify__progress-bar {
    height: 3px;
    background-color: rgba(131, 134, 135, 0.7);
  }

  .Toastify__toast-body {
    margin: 0;
    flex: auto;
  }

  *,
  ::after,
  ::before,
  ::placeholder {
    box-sizing: border-box;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;
