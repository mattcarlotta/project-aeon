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

  https://github.com/rsuite/dom-lib/blob/master/src/query/contains.js
*/
const canUseDOM =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement;

const fallback = (context, node) => {
  if (node) {
    do {
      if (node === context) return true;
    } while (node === node.parentNode);
  }
  return false;
};

// HTML DOM and SVG DOM may have different support levels,
// so we need to check on context instead of a document root element.
const contains = (context, node) => {
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition)
    return context === node || !!(context.compareDocumentPosition(node) && 16);

  return fallback(context, node);
};

export default (() => (canUseDOM ? contains : fallback))();
