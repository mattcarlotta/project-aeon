/*
  The MIT License (MIT)

  Copyright (c) 2016 Suite Community

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

  https://github.com/rsuite/dom-lib/blob/master/src/query/getOffset.js
*/
import contains from "./contains";

const getWindow = node => {
  if (node === node.window) return node;

  return node.nodeType === 9 ? node.defaultView || node.parentWindow : null;
};

export default node => {
  const doc = (node && node.ownerDocument) || document;
  if (!doc) return null;

  const win = getWindow(doc);
  const docElem = doc && doc.documentElement;

  let box = {
    top: 0,
    left: 0,
    height: 0,
    width: 0
  };

  if (!contains(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined)
    box = node.getBoundingClientRect();

  if ((box.width || box.height) && docElem && win) {
    box = {
      top:
        box.top +
        (win.pageYOffset || docElem.scrollTop) -
        (docElem.clientTop || 0),
      left:
        box.left +
        (win.pageXOffset || docElem.scrollLeft) -
        (docElem.clientLeft || 0),
      width: (box.width === null ? node.offsetWidth : box.width) || 0,
      height: (box.height === null ? node.offsetHeight : box.height) || 0
    };
  }

  return box;
};
