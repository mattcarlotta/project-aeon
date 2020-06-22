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

const exports = (e, fn) => {
  const window = this;

  if (!e.__resizeListeners__) {
    e.__resizeListeners__ = [];
    if (window.document.attachEvent) {
      e.__resizeTrigger__ = e;
      e.attachEvent("onresize", resizeListener);
    } else if (getComputedStyle(e).position === "static") {
      e.style.position = "relative";
    }
  }
  e.__resizeListeners__.push(fn);
};

export const unbind = (e, fn) => {
  let listeners = e.__resizeListeners__ || [];
  if (fn) {
    const index = listeners.indexOf(fn);
    if (index !== -1) listeners.splice(index, 1);
  } else {
    e.__resizeListeners__ = [];
    listeners = e.__resizeListeners__;
  }

  if (!listeners.length) {
    if (document.attachEvent) {
      e.detachEvent("onresize", resizeListener);
    } else if (e.__resizeTrigger__) {
      const contentDocument = e.__resizeTrigger__.contentDocument;
      const defaultView = contentDocument && contentDocument.defaultView;

      if (defaultView) {
        defaultView.removeEventListener("resize", resizeListener);
        delete defaultView.__resizeTrigger__;
      }

      e.__resizeTrigger__ = !e.removeChild(e.__resizeTrigger__);
    }
    delete e.__resizeListeners__;
  }
};

export default () =>
  typeof window === "undefined" ? exports : exports.bind(window);
