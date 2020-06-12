const resizeListener = e => {
  const win = e.target || e.srcElement;

  if (win.__resizeRAF__) cancelAnimationFrame(win.__resizeRAF__);

  win.__resizeRAF__ = requestAnimationFrame(() => {
    const trigger = win.__resizeTrigger__;
    const listeners = trigger && trigger.__resizeListeners__;
    if (listeners) {
      listeners.forEach(fn => {
        fn.call(trigger, e);
      });
    }
  });
};

const exports = (element, fn) => {
  const window = this;
  const document = window.document;
  const attachEvent = document.attachEvent;

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    if (attachEvent) {
      element.__resizeTrigger__ = element;
      element.attachEvent("onresize", resizeListener);
    } else if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }
  }
  element.__resizeListeners__.push(fn);
};

export const unbind = (element, fn) => {
  const attachEvent = document.attachEvent;
  let listeners = element.__resizeListeners__ || [];
  if (fn) {
    const index = listeners.indexOf(fn);
    if (index !== -1) listeners.splice(index, 1);
  } else {
    element.__resizeListeners__ = [];
    listeners = element.__resizeListeners__;
  }

  if (!listeners.length) {
    if (attachEvent) {
      element.detachEvent("onresize", resizeListener);
    } else if (element.__resizeTrigger__) {
      const contentDocument = element.__resizeTrigger__.contentDocument;
      const defaultView = contentDocument && contentDocument.defaultView;

      if (defaultView) {
        defaultView.removeEventListener("resize", resizeListener);
        delete defaultView.__resizeTrigger__;
      }

      element.__resizeTrigger__ = !element.removeChild(
        element.__resizeTrigger__,
      );
    }
    delete element.__resizeListeners__;
  }
};

export default () =>
  typeof window === "undefined" ? exports : exports.bind(window);
